
import { supabase } from '@/integrations/supabase/client';

export const authServices = {
  signUp: async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });
    return { error };
  },

  signIn: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  },

  driverSignUp: async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/driver-dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          is_driver: true,
        }
      }
    });
    return { error };
  },

  driverSignIn: async (email: string, password: string) => {
    // First, attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      // After successful sign-in, check if this user has a driver profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: driverProfile } = await supabase
          .from('driver_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (!driverProfile) {
          // User doesn't have a driver profile, sign them out and return error
          await supabase.auth.signOut();
          return { error: { message: "No driver account found for this email. Please sign up as a driver first." } };
        }
      }
    }
    
    return { error };
  },

  adminSignIn: async (email: string, password: string) => {
    // First, attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      // After successful sign-in, check if this user has an admin profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: adminProfile } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (!adminProfile || !adminProfile.is_active) {
          // User doesn't have an admin profile, sign them out and return error
          await supabase.auth.signOut();
          return { error: { message: "No admin privileges found for this account." } };
        }
      }
    }
    
    return { error };
  },

  signInWithGoogle: async () => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });
    return { error };
  },

  signOut: async () => {
    await supabase.auth.signOut();
  }
};
