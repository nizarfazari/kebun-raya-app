import { create } from "zustand";
import { persist } from "zustand/middleware";

type DeliveryData = {
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  courier: string;
  province: string;
};

type Actions = {
  setDataDelivery: (data: DeliveryData) => void;
  resetDataDelivery: () => void; // Tambahkan aksi resetDataDelivery
};

type DeliveryState = {
  dataDelivery: DeliveryData;
  total_weight: string;
  total_price: string;
};

const defaultDataDelivery: DeliveryData = {
  first_name: "",
  last_name: "",
  email: "",
  city: "",
  courier: "",
  province: "",
};

export const useDelivery = create<DeliveryState & Actions>()(
  persist(
    (set) => ({
      dataDelivery: defaultDataDelivery,
      total_weight: "",
      total_price: "",
      setDataDelivery: (data: DeliveryData) => {
        set({ dataDelivery: data });
      },
      resetDataDelivery: () => {
        set({ dataDelivery: defaultDataDelivery });
      },
    }),
    {
      name: "delivery-data",
    }
  )
);
