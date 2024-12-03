import { RESTARUANT_API_POINT } from "@/api/API_POINT";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

axios.defaults.withCredentials = true;

type MenuItem = {
  _id:string;
  name:string;
  description:string;
  price:number;
  image:string
}

type Restaruant ={
  _id:string;
  user:string;
  restaurantName:string
  city:string;
  country:string;
  deliveryTime:number;
  cuisines:string[];
  menu:MenuItem[];
  imageUrl:string;
}

type RestaurantState = {
  loading: boolean;
  restaurant: Restaruant|null;
  searchedRestaurant: null;
  singleRestaurant: null;
  appliedFilter: string[];
  getRestaurant: () => Promise<void>;
  createRestaruant: (formData: FormData) => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchResyarauant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
};

export const useRestaurant = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      // restaurantOrder: [],

      //create restaruant
      createRestaruant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${RESTARUANT_API_POINT}`,
            formData,
            {
              headers: { "Content-Type": "multipart/json" },
            }
          );
          toast.success(data.message);
          set({ loading: false });
        } catch (error: any) {
          console.log(error);
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },

      //get restaruant
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.get(`${RESTARUANT_API_POINT}`);
          set({ loading: false, restaurant: data.restaurant });
        } catch (error: any) {
          console.log(error);
          if (error?.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      //update restarauant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const { data } = await axios.put(
            `${RESTARUANT_API_POINT}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          set({ loading: false });
          toast.success(data.message);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      //search restarauant
      searchResyarauant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const { data } = await axios.get(
            `${RESTARUANT_API_POINT}/search/${searchText}?${params.toString()}`
          );
          set({ loading: false, searchedRestaurant: data });
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },
    }),

    {
      name: "restaruant",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
