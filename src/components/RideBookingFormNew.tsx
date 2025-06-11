
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Users, ArrowUpRight, ArrowDownLeft, Map } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RoutePreview from "@/components/RoutePreview";
import LocationSearchInput from "@/components/LocationSearchInput";
import MapLocationPicker from "@/components/MapLocationPicker";
import PaystackPayment from "@/components/PaystackPayment";
import VehicleOptions from "@/components/VehicleOptions";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Type definitions
type BookingStep = 'location' | 'date' | 'vehicle' | 'payment';
type BookingType = 'join' | 'full';

// Nigerian locations data
const nigerianLocations = {
  universities: [
    "Afe Babalola University, Ado-Ekiti"
  ],
  states: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
    "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", 
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", 
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ]
};

// Form schema using Zod for validation
const bookingFormSchema = z.object({
  from: z.string().min(1, "Please select a departure location"),
  to: z.string().min(1, "Please select a destination location"),
  fromType: z.enum(["university", "state"]),
  toType: z.enum(["university", "state"]),
  specificLocation: z.string().optional(),
  mapLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string()
  }).optional(),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  passengers: z.string().min(1, "Please select the number of passengers"),
  vehicleId: z.string().min(1, "Please select a vehicle"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const vehicles = [
  { id: 'corolla', name: 'Sedan', capacity: 4, base_price: 3500 },
  { id: 'sienna', name: 'Mini Van', capacity: 6, base_price: 5000 },
  { id: 'hiace', name: 'Mini Bus', capacity: 14, base_price: 7000 },
  { id: 'long-bus', name: 'Bus', capacity: 18, base_price: 8000 },
];

const RideBookingFormNew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('location');
  const [bookingType, setBookingType] = useState<BookingType>('join');
  const [showPreview, setShowPreview] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [availableRides, setAvailableRides] = useState<any[]>([]);
  
  // Check for available rides
  const { data: existingRides } = useQuery({
    queryKey: ['available-rides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('status', 'confirmed')
        .gte('departure_date', format(new Date(), 'yyyy-MM-dd'));
      
      if (error) throw error;
      return data || [];
    },
  });

  // Get admin-configured travel times
  const { data: availableTimes } = useQuery({
    queryKey: ['available-times'],
    queryFn: async () => {
      return ["08:00", "12:00", "14:00", "18:00"];
    },
  });
  
  // Initialize the form with React Hook Form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      from: "",
      to: "",
      fromType: "university",
      toType: "state",
      specificLocation: "",
      time: "",
      passengers: "1",
      vehicleId: "",
    },
  });
  
  const watchFrom = form.watch("from");
  const watchTo = form.watch("to");
  const watchFromType = form.watch("fromType");
  const watchToType = form.watch("toType");
  const watchVehicleId = form.watch("vehicleId");
  const watchMapLocation = form.watch("mapLocation");
  const watchPassengers = form.watch("passengers");
  
  // Calculate price based on route and vehicle
  useEffect(() => {
    if (watchVehicleId) {
      const selectedVehicle = vehicles.find(v => v.id === watchVehicleId);
      
      if (selectedVehicle) {
        let basePrice = selectedVehicle.base_price;
        
        if (bookingType === 'full') {
          // 10% discount for full ride booking
          basePrice = Math.round(basePrice * 0.9);
        } else {
          // Per seat pricing
          basePrice = Math.round(basePrice / selectedVehicle.capacity) * parseInt(watchPassengers);
        }
        
        setCalculatedPrice(basePrice);
      }
    }
  }, [watchVehicleId, watchPassengers, bookingType]);

  // Check for available rides when route changes
  useEffect(() => {
    if (watchFrom && watchTo && existingRides) {
      const matching = existingRides.filter(ride => 
        (ride.from_location === watchFrom && ride.to_location === watchTo) ||
        (ride.from_location === watchTo && ride.to_location === watchFrom)
      );
      setAvailableRides(matching);
    }
  }, [watchFrom, watchTo, existingRides]);
  
  // Check authentication before allowing booking
  const checkAuthAndProceed = () => {
    if (!user) {
      toast.error("Please sign in to book a ride");
      navigate('/signin');
      return false;
    }
    return true;
  };

  const isLocationStepValid = () => {
    const baseValid = watchFrom && 
      watchTo && 
      ((watchFromType === 'university' && watchToType === 'state') || 
       (watchFromType === 'state' && watchToType === 'university'));
    
    // For "book entire ride", also require specific location OR map location
    if (bookingType === 'full') {
      return baseValid && (form.watch("specificLocation") || watchMapLocation);
    }
    
    return baseValid;
  };
  
  useEffect(() => {
    // Show preview when both from and to are selected
    setShowPreview(watchFrom && watchTo ? true : false);
  }, [watchFrom, watchTo]);

  const isDateStepValid = form.watch("date") && form.watch("time");
  
  // Navigation functions
  const nextStep = () => {
    if (!checkAuthAndProceed()) return;
    
    if (currentStep === 'location') {
      // Check if joining a ride but no available rides
      if (bookingType === 'join' && availableRides.length === 0) {
        toast.error("No available rides for this route. Please book the entire ride instead.");
        setBookingType('full');
        return;
      }
      setCurrentStep('date');
    }
    else if (currentStep === 'date') setCurrentStep('vehicle');
    else if (currentStep === 'vehicle') setCurrentStep('payment');
  };

  const prevStep = () => {
    if (currentStep === 'payment') setCurrentStep('vehicle');
    else if (currentStep === 'vehicle') setCurrentStep('date');
    else if (currentStep === 'date') setCurrentStep('location');
  };

  // Handle payment success
  const handlePaymentSuccess = async (reference: string) => {
    try {
      const formData = form.getValues();
      const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
      
      // Create ride booking
      const { data: booking, error } = await supabase
        .from('rides')
        .insert({
          user_id: user?.id,
          from_location: formData.from,
          to_location: formData.to,
          departure_date: format(formData.date, 'yyyy-MM-dd'),
          departure_time: formData.time,
          seats_requested: bookingType === 'full' ? selectedVehicle?.capacity : parseInt(formData.passengers),
          booking_type: bookingType,
          price: calculatedPrice,
          status: 'confirmed',
          pickup_location: formData.specificLocation || formData.mapLocation?.address,
          payment_reference: reference
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Booking confirmed! Redirecting to dashboard...");
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error("Error creating booking. Please contact support.");
    }
  };

  // Form submission
  const onSubmit = (data: BookingFormValues) => {
    if (!checkAuthAndProceed()) return;
    setShowPayment(true);
  };

  // Toggle location type
  const toggleLocationType = (field: "fromType" | "toType", value: "university" | "state") => {
    const otherField = field === "fromType" ? "toType" : "fromType";
    const otherValue = value === "university" ? "state" : "university";
    
    form.setValue(field, value);
    form.setValue(otherField, otherValue);
    
    // Reset location selections when types change
    form.setValue("from", "");
    form.setValue("to", "");
  };

  const getStateForLocationSearch = () => {
    if (watchFromType === 'state') return watchFrom;
    if (watchToType === 'state') return watchTo;
    return '';
  };

  const handleMapLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    form.setValue("mapLocation", location);
    // Clear text-based specific location if map location is selected
    form.setValue("specificLocation", "");
  };

  if (showPayment) {
    const formData = form.getValues();
    return (
      <PaystackPayment
        amount={calculatedPrice}
        email={user?.email || ""}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
        rideDetails={{
          from: formData.from,
          to: formData.to,
          date: format(formData.date, 'PPP'),
          time: formData.time,
          passengers: bookingType === 'full' ? vehicles.find(v => v.id === formData.vehicleId)?.capacity || 1 : parseInt(formData.passengers)
        }}
      />
    );
  }

  return (
    <>
      <Card className="w-full mx-auto md:mx-0 max-w-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Book Your Campus Ride</h2>
          
          <Tabs value={bookingType} onValueChange={(v) => setBookingType(v as BookingType)} className="mb-6 rounded-[3.5rem]">
            <TabsList className="grid w-full grid-cols-2 rounded-[2rem]">
              <TabsTrigger value="join" className="data-[state=active]:bg-black data-[state=active]:text-white hover:bg-gray-100 transition-colors rounded-[1.5rem]">Book Seat</TabsTrigger>
              <TabsTrigger value="full" className="data-[state=active]:bg-black data-[state=active]:text-white hover:bg-gray-100 transition-colors rounded-[1.5rem]">Book Entire Ride</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-6">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center ${currentStep === 'location' ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'location' ? 'bg-black text-white' : 'bg-gray-200'} transition-all duration-300`}>1</div>
                <span className="text-xs">Location</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep === 'date' ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'date' ? 'bg-black text-white' : 'bg-gray-200'} transition-all duration-300`}>2</div>
                <span className="text-xs">Date & Time</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep === 'vehicle' ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'vehicle' ? 'bg-black text-white' : 'bg-gray-200'} transition-all duration-300`}>3</div>
                <span className="text-xs">Vehicle</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === 'payment' ? 'bg-black text-white' : 'bg-gray-200'} transition-all duration-300`}>4</div>
                <span className="text-xs">Payment</span>
              </div>
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-black rounded-full transition-all duration-500" 
                style={{ width: currentStep === 'location' ? '25%' : currentStep === 'date' ? '50%' : currentStep === 'vehicle' ? '75%' : '100%' }}
              ></div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 'location' && (
                <div className="space-y-6">
                  {/* From Location */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600">
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900 mb-1">
                          Departing From
                        </label>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Button 
                            type="button"
                            variant={watchFromType === "university" ? undefined : "outline"} 
                            size="sm"
                            onClick={() => toggleLocationType("fromType", "university")}
                            className={`${watchFromType === "university" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-[2rem] hover:bg-black hover:text-white transition-colors duration-200`}
                          >
                            University
                          </Button>
                          <Button 
                            type="button"
                            variant={watchFromType === "state" ? undefined : "outline"} 
                            size="sm"
                            onClick={() => toggleLocationType("fromType", "state")}
                            className={`${watchFromType === "state" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-[2rem] hover:bg-black hover:text-white transition-colors duration-200`}
                          >
                            State
                          </Button>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="from"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="rounded-[2rem]">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                                      <SelectValue placeholder={`Select departure ${watchFromType}`} />
                                    </div>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {watchFromType === "university"
                                    ? nigerianLocations.universities.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                      ))
                                    : nigerianLocations.states.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                      ))
                                  }
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* To Location */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black">
                        <ArrowDownLeft className="h-4 w-4 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900 mb-1">
                          Going To
                        </label>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Button 
                            type="button"
                            variant={watchToType === "university" ? undefined : "outline"} 
                            size="sm"
                            onClick={() => toggleLocationType("toType", "university")}
                            className={`${watchToType === "university" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-[2rem] hover:bg-black hover:text-white transition-colors duration-200`}
                          >
                            University
                          </Button>
                          <Button 
                            type="button"
                            variant={watchToType === "state" ? undefined : "outline"} 
                            size="sm"
                            onClick={() => toggleLocationType("toType", "state")}
                            className={`${watchToType === "state" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-[2rem] hover:bg-black hover:text-white transition-colors duration-200`}
                          >
                            State
                          </Button>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="to"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="rounded-[2rem]">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                                      <SelectValue placeholder={`Select destination ${watchToType}`} />
                                    </div>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {watchToType === "university"
                                    ? nigerianLocations.universities.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                      ))
                                    : nigerianLocations.states.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                      ))
                                  }
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specific Location for "Book Entire Ride" */}
                  {bookingType === 'full' && (watchFrom || watchTo) && (
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="specificLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specific location in {getStateForLocationSearch()}</FormLabel>
                            <FormControl>
                              <LocationSearchInput
                                value={field.value || ''}
                                onChange={field.onChange}
                                placeholder="Enter specific location"
                                stateFilter={getStateForLocationSearch()}
                                className="rounded-[2rem]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-center">
                        <span className="text-sm text-gray-500">OR</span>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowMapPicker(true)}
                      >
                        <Map className="mr-2 h-4 w-4" />
                        Choose Location on Map
                      </Button>
                      
                      {watchMapLocation && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">Map Location Selected:</p>
                              <p className="text-xs text-green-700">{watchMapLocation.address}</p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-xs text-green-600 hover:text-green-800 p-0 h-auto"
                                onClick={() => form.setValue("mapLocation", undefined)}
                              >
                                Clear map location
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Route Preview */}
                  {showPreview && isLocationStepValid() && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-medium mb-2">Route Preview</p>
                      <RoutePreview 
                        from={watchFrom} 
                        to={watchTo} 
                        fromType={watchFromType} 
                        toType={watchToType} 
                      />
                    </div>
                  )}

                  {/* Available Rides Info */}
                  {bookingType === 'join' && availableRides.length === 0 && watchFrom && watchTo && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        No available rides for this route. You'll need to book the entire ride.
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    type="button"
                    onClick={nextStep} 
                    className="w-full bg-black text-white hover:bg-gray-900" 
                    disabled={!isLocationStepValid()}
                  >
                    Next
                  </Button>
                </div>
              )}

              {currentStep === 'date' && (
                <div className="space-y-4">
                  {/* Date Selection */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Travel Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full bg-white flex justify-between items-center pl-3 text-left font-normal hover:bg-gray-50 transition-colors ${!field.value && "text-muted-foreground"}`}
                              >
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </div>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Time Selection */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travel Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="flex items-center hover:border-black transition-colors rounded-[2rem]">
                              <Clock className="mr-2 h-5 w-5 text-gray-500" />
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(availableTimes || ["08:00", "12:00", "14:00", "18:00"]).map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Passengers - only show for join rides */}
                  {bookingType === 'join' && (
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="flex items-center hover:border-black transition-colors rounded-[2rem]">
                                <Users className="mr-2 h-5 w-5 text-gray-500" />
                                <SelectValue placeholder="Select passengers" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'passenger' : 'passengers'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {bookingType === 'full' && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You're booking the entire vehicle. Number of passengers will be determined by the vehicle capacity.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={prevStep} 
                      className="w-1/2"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={nextStep} 
                      className="w-1/2 bg-black text-white hover:bg-gray-900" 
                      disabled={!isDateStepValid}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'vehicle' && (
                <div className="space-y-4">
                  <FormLabel>Select Vehicle</FormLabel>
                  <FormField
                    control={form.control}
                    name="vehicleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <VehicleOptions
                            selectedVehicle={field.value}
                            onSelect={field.onChange}
                            bookingType={bookingType}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {calculatedPrice > 0 && (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <div className="text-lg font-semibold">
                        Total: ₦{calculatedPrice.toLocaleString()}
                        {bookingType === 'full' && (
                          <span className="text-sm text-green-600 block">10% discount applied!</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={prevStep} 
                      className="w-1/2"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-1/2 bg-black text-white hover:bg-gray-900"
                      disabled={!watchVehicleId}
                    >
                      {bookingType === 'join' ? 'Book Seat' : 'Book Entire Ride'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </Card>

      {/* Map Location Picker Modal */}
      {showMapPicker && (
        <MapLocationPicker
          onLocationSelect={handleMapLocationSelect}
          onClose={() => setShowMapPicker(false)}
          initialLocation={getStateForLocationSearch()}
        />
      )}
    </>
  );
};

export default RideBookingFormNew;
