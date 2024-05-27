import { create } from "zustand";

type Delivery = {
  name: string;
  email: string;
  province: string;
  city: string;
  courier: string;
  nameCourier: string;
  total_weight: string;
  total_price: string;
};

type DeliveryData = {
  name: string;
  email: string;
  city: string;
  courier: string;
  nameCourier: string;
};

type Actions = {
  setProvince?: (province: string) => void;
  setCity?: () => void;
  setCourier?: () => void;
  setDataDelivery?: ({
    name,
    email,
    city,
    courier,
    nameCourier,
  }: DeliveryData) => void;
};

export const useDelivery = create<Delivery & Actions>((set) => ({
  name: "",
  email: "",
  province: "",
  city: "",
  courier: "",
  total_weight: "",
  total_price: "",
  nameCourier: "",
  setCourier : () => {},
  setProvince: (province: string) => set({ province: province }),
  setDataDelivery: ({
    name,
    email,
    city,
    courier,
    nameCourier,
  }: DeliveryData) => {
    set({ name, email, city, courier, nameCourier });
  },
}));
