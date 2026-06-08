"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menu";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

interface CartContextProps {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemNameFr: string) => void;
  updateQuantity: (itemNameFr: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("margoum_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart storage", e);
      }
    }
  }, []);

  // Save cart to local storage when items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("margoum_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (item: MenuItem, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.item.name.fr === item.name.fr);
      if (existing) {
        return prevItems.map((i) =>
          i.item.name.fr === item.name.fr
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prevItems, { item, quantity }];
    });
    // Automatically open drawer on add
    setIsOpen(true);
  };

  const removeItem = (itemNameFr: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.item.name.fr !== itemNameFr));
  };

  const updateQuantity = (itemNameFr: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemNameFr);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.item.name.fr === itemNameFr ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: isMounted ? items : [], // SSR-safe
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalPrice: isMounted ? totalPrice : 0,
        totalCount: isMounted ? totalCount : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
