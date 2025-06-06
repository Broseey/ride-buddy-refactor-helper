
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: any;
  driverProfile: any;
  adminProfile: any;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  driverSignUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  driverSignIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}
