import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number | null;
    slug: string;
    imageUrl: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemsCount: () => number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            setIsOpen: (isOpen) => set({ isOpen }),
            addItem: (newItem) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === newItem.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    set({ items: [...items, { ...newItem, quantity: 1 }], isOpen: true });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
            getItemsCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: "kinenovaa-cart",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
);
