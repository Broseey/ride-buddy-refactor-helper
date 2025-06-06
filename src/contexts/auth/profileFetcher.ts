
import { supabase } from '@/integrations/supabase/client';

export const fetchUserProfiles = async (userId: string) => {
  const profiles = {
    userProfile: null,
    driverProfile: null,
    adminProfile: null
  };

  try {
    // Try to fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    profiles.userProfile = profile;

    // Try to fetch driver profile
    const { data: driverProf } = await supabase
      .from('driver_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    profiles.driverProfile = driverProf;

    // Try to fetch admin profile
    const { data: adminProf } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    profiles.adminProfile = adminProf;
  } catch (error) {
    console.log('Error fetching profiles:', error);
  }

  return profiles;
};
