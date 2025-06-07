
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  fromLocation: z.string().min(1, "From location is required"),
  toLocation: z.string().min(1, "To location is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  basePrice: z.number().min(0, "Base price must be positive"),
  pricePerKm: z.number().min(0, "Price per km must be positive"),
});

const PricingManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      vehicleType: "",
      basePrice: 0,
      pricePerKm: 0,
    },
  });

  // Fetch pricing rules
  const { data: pricingRules, isLoading } = useQuery({
    queryKey: ['pricing-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Create pricing rule
  const createPricingRule = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { error } = await supabase
        .from('pricing_rules')
        .insert({
          from_location: values.fromLocation,
          to_location: values.toLocation,
          vehicle_type: values.vehicleType,
          base_price: values.basePrice,
          price_per_km: values.pricePerKm,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing-rules'] });
      toast.success('Pricing rule created successfully');
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create pricing rule');
    },
  });

  // Update pricing rule
  const updatePricingRule = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: z.infer<typeof formSchema> }) => {
      const { error } = await supabase
        .from('pricing_rules')
        .update({
          from_location: values.fromLocation,
          to_location: values.toLocation,
          vehicle_type: values.vehicleType,
          base_price: values.basePrice,
          price_per_km: values.pricePerKm,
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing-rules'] });
      toast.success('Pricing rule updated successfully');
      setIsDialogOpen(false);
      setEditingPrice(null);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to update pricing rule');
    },
  });

  // Delete pricing rule
  const deletePricingRule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('pricing_rules')
        .update({ is_active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing-rules'] });
      toast.success('Pricing rule deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete pricing rule');
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingPrice) {
      updatePricingRule.mutate({ id: editingPrice.id, values });
    } else {
      createPricingRule.mutate(values);
    }
  };

  const handleEdit = (rule: any) => {
    setEditingPrice(rule);
    form.setValue('fromLocation', rule.from_location);
    form.setValue('toLocation', rule.to_location);
    form.setValue('vehicleType', rule.vehicle_type);
    form.setValue('basePrice', rule.base_price);
    form.setValue('pricePerKm', rule.price_per_km);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pricing rule?')) {
      deletePricingRule.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing Management
          </CardTitle>
          <CardDescription>
            Set up pricing rules for different routes and vehicle types
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingPrice(null); form.reset(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Pricing Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPrice ? 'Edit Pricing Rule' : 'Add New Pricing Rule'}
              </DialogTitle>
              <DialogDescription>
                Set the pricing for a specific route and vehicle type
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fromLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Lagos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="toLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Ibadan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="minibus">Mini Bus</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price (₦)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5000"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerKm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per KM (₦)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="50"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createPricingRule.isPending || updatePricingRule.isPending}>
                    {editingPrice ? 'Update' : 'Create'} Rule
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Loading pricing rules...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Price/KM</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingRules?.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    {rule.from_location} → {rule.to_location}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {rule.vehicle_type}
                    </Badge>
                  </TableCell>
                  <TableCell>₦{rule.base_price.toLocaleString()}</TableCell>
                  <TableCell>₦{rule.price_per_km}</TableCell>
                  <TableCell>
                    <Badge variant={rule.is_active ? "default" : "secondary"}>
                      {rule.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingManagement;
