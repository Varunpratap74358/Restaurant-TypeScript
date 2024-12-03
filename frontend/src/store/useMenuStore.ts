import { MENU_API_POINT } from "@/api/API_POINT";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

axios.defaults.withCredentials = true;

type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (formData: FormData, menuId: string) => Promise<void>;
  deleteMenu: (menuId: string) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`${MENU_API_POINT}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success(data.message);
          set({ loading: false, menu: data.menu });
        } catch (error: any) {
          console.log(error);
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Menu not created");
        }
      },
      editMenu: async (formData: FormData, menuId: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.put(
            `${MENU_API_POINT}/${menuId}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          toast.success(data.message);
          set({ loading: false, menu: data.menu });
        } catch (error: any) {
          console.log(error);
          set({ loading: false });
          toast.error(
            error?.response?.data?.message || "Some problem menu not added"
          );
        }
      },

      deleteMenu: async (menuId: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.delete(`${MENU_API_POINT}/${menuId}`, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success(data.message);
          set({ loading: false });
        } catch (error: any) {
          console.log(error);
          set({ loading: false });
          toast.error(
            error?.response?.data?.message || "Some problem menu not added"
          );
        }
      },
    }),
    {
      name: "Menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
