import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { USER_API_POINT } from "@/api/API_POINT";
import { LoginupInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

axios.defaults.withCredentials = true;

type user = {
  fullname:string;
  email:string;
  contact:number;
  address:string;
  city:string;
  country:string;
  profilePicture:string;
  admin:boolean;
  isVerified:boolean;
}

type userState = {
  user:null | user;
  isAuthenticated:boolean;
  isCheckingAuth:boolean;
  loading:boolean;
  signup:(input:SignupInputState)=>Promise<void>;
  login:(input:LoginupInputState)=>Promise<void>;
  verify:(input:string)=>Promise<void>;
  checkAuthentation:()=>Promise<void>;
  logout:()=>Promise<void>;
  forgotPassword:(email:string)=>Promise<void>;
  resetPassword:(token:string, newPassword:string)=>Promise<void>;
  updateProflie:(profileData:any)=>Promise<void>
}

export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      //signup api implimentation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`${USER_API_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(data);
          set({ loading: false, user: data.user, isAuthenticated: true });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          console.log(error);
          toast.error(error?.response?.data?.message);
        }
      },

      //login
      login: async (input: LoginupInputState) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`${USER_API_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          set({ loading: false, user: data.user, isAuthenticated: true });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

      //verify email
      verify: async (input: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${USER_API_POINT}/verify-email`,
            { verificationCode: input },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          set({ loading: false, user: data.user, isAuthenticated: true });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

      //check auth
      checkAuthentation: async () => {
        try {
          set({ isCheckingAuth: true });
          const { data } = await axios.get(`${USER_API_POINT}/check-auth`);
          set({
            user: data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
          // toast.success(data.message);
        } catch (error: any) {
          set({ isAuthenticated: false, isCheckingAuth: true });
          console.log(error);
          // toast.error(error?.response?.data?.message);
        }
      },

      //logout
      logout: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.get(`${USER_API_POINT}/logout`);
          console.log(data);
          set({ loading: false, user: null, isAuthenticated: false });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false, isAuthenticated: false });
          console.log(error);
          toast.error(error?.response?.data?.message);
        }
      },

      //forgot password
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${USER_API_POINT}/forgot-password`,
            { email },
            { headers: { "Content-Type": "application/json" } }
          );
          set({ loading: false });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

      //reset password
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${USER_API_POINT}/reset-password/${token}`,
            { newPassword },
            { headers: { "Content-Type": "application/json" } }
          );
          set({ loading: false });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

      //update profile
      updateProflie: async (profileData: any) => {
        try {
          set({ loading: true });
          const { data } = await axios.put(
            `${USER_API_POINT}/profile/update`,
            profileData,
            { headers: { "Content-Type": "appliaction/json" } }
          );
          set({ loading: false,user:data.user, isAuthenticated: true });
          toast.success(data.message);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
