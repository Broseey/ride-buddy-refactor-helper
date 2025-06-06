
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from './types';
import { authServices } from './services';
import { fetchUserProfiles } from './profileFetcher';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [driverProfile, setDriverProfile] = useState<any>(null);
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profiles after authentication
          setTimeout(async () => {
            const profiles = await fetchUserProfiles(session.user.id);
            setUserProfile(profiles.userProfile);
            setDriverProfile(profiles.driverProfile);
            setAdminProfile(profiles.adminProfile);
          }, 0);
        } else {
          setUserProfile(null);
          setDriverProfile(null);
          setAdminProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await authServices.signOut();
    setUser(null);
    setSession(null);
    setUserProfile(null);
    setDriverProfile(null);
    setAdminProfile(null);
  };

  const value = {
    user,
    session,
    userProfile,
    driverProfile,
    adminProfile,
    isLoading,
    signUp: authServices.signUp,
    signIn: authServices.signIn,
    driverSignUp: authServices.driverSignUp,
    driverSignIn: authServices.driverSignIn,
    adminSignIn: authServices.adminSignIn,
    signInWithGoogle: authServices.signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
