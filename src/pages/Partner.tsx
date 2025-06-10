
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Building2, Users, DollarSign, Truck, Mail, Phone, Globe, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  websiteUrl: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  description: z.string().min(10, "Please provide a brief description"),
  fleetSize: z.number().min(1, "Fleet size must be at least 1"),
  serviceAreas: z.string().min(5, "Please specify your service areas"),
});

const Partner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactEmail: "",
      contactPhone: "",
      websiteUrl: "",
      description: "",
      fleetSize: 1,
      serviceAreas: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('ride_companies')
        .insert({
          company_name: values.companyName,
          contact_email: values.contactEmail,
          contact_phone: values.contactPhone,
          website_url: values.websiteUrl || null,
          description: values.description,
          fleet_size: values.fleetSize,
          service_areas: values.serviceAreas.split(',').map(area => area.trim()),
          status: 'pending'
        });

      if (error) {
        toast.error("Failed to submit partnership application");
      } else {
        toast.success("Partnership application submitted successfully! We'll review it and get back to you within 3-5 business days.");
        form.reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-black rounded-full p-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner with Uniride</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our network of transportation partners and expand your business reach
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-black mx-auto mb-4" />
              <CardTitle>Expand Your Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Access thousands of potential customers through our platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-black mx-auto mb-4" />
              <CardTitle>Increase Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Maximize your fleet utilization and boost earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 text-black mx-auto mb-4" />
              <CardTitle>Fleet Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Use our tools to efficiently manage your vehicle fleet
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Partnership Application</CardTitle>
            <CardDescription>
              Tell us about your company and we'll get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input className="pl-10" placeholder="Your Company Ltd" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input className="pl-10" placeholder="contact@company.com" type="email" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input className="pl-10" placeholder="+234 800 000 0000" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input className="pl-10" placeholder="https://yourcompany.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fleetSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fleet Size</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            className="pl-10" 
                            type="number" 
                            placeholder="Number of vehicles"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceAreas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Areas</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input 
                            className="pl-10" 
                            placeholder="Lagos, Abuja, Port Harcourt (comma separated)"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your company, services, and experience in transportation..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Submitting Application...
                    </span>
                  ) : (
                    "Submit Partnership Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partner;
