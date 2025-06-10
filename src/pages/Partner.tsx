
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Building2, Users, TrendingUp, Shield, CheckCircle, Mail, Phone, Globe, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const partnerFormSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website_url: z.string().url("Invalid website URL").optional().or(z.literal("")),
  description: z.string().min(50, "Description must be at least 50 characters"),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

const Partner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      company_name: "",
      contact_email: "",
      contact_phone: "",
      website_url: "",
      description: "",
    },
  });

  const onSubmit = async (values: PartnerFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('ride_companies')
        .insert({
          company_name: values.company_name,
          contact_email: values.contact_email,
          contact_phone: values.contact_phone,
          website_url: values.website_url || null,
          description: values.description,
          status: 'pending',
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Partnership application submitted successfully!");
      form.reset();
    } catch (error) {
      console.error('Error submitting partnership application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-4">
              <Handshake className="h-12 w-12 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Partner with Uniride
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our network of trusted transportation companies and help us provide safe, 
            reliable rides for students across Nigeria.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner with Uniride?</h2>
            <p className="text-xl text-gray-600">Unlock new opportunities for your transportation business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Access to Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with thousands of students who need reliable transportation 
                  between universities and cities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Increase Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimize your vehicle utilization and increase revenue with 
                  our demand-driven booking platform.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Verified Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join a verified network of transportation providers with 
                  background checks and quality standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Brand Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Increase your brand visibility among university students 
                  and build lasting customer relationships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply for Partnership</h2>
            <p className="text-xl text-gray-600">Fill out the form below to start your partnership with Uniride</p>
          </div>

          {isSubmitted ? (
            <Card className="text-center py-12">
              <CardContent>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in partnering with Uniride. We'll review your 
                  application and get back to you within 3-5 business days at{" "}
                  <span className="font-medium">partner@uniride.ng</span>
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Company Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Contact Email
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="contact@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Contact Phone
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+234 xxx xxx xxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              Website URL (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://www.company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your company, fleet size, service areas, and experience in transportation..."
                              className="min-h-[120px]"
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting Application...
                        </div>
                      ) : (
                        "Submit Partnership Application"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-4">
            Contact our partnership team for more information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:partner@uniride.ng" 
              className="flex items-center gap-2 text-black hover:underline"
            >
              <Mail className="h-4 w-4" />
              partner@uniride.ng
            </a>
            <span className="hidden sm:block text-gray-400">•</span>
            <a 
              href="tel:+2348123456789" 
              className="flex items-center gap-2 text-black hover:underline"
            >
              <Phone className="h-4 w-4" />
              +234 812 345 6789
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2025 Uniride. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Partner;
