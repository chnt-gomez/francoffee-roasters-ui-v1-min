import React, { createContext, useContext } from 'react'
import useCheckoutHook from '../hooks/useCheckoutHook';
import type { CartItem } from '@/types/cart.interface';

const CheckoutContext = createContext<ReturnType<typeof useCheckoutHook> | null>(null);

export const CheckoutProvider = ({ children, cartItems }: { children: React.ReactNode, cartItems: CartItem[] }) => {
    const checkout = useCheckoutHook(cartItems);
    return (
        <CheckoutContext.Provider value={checkout}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) throw new Error('useCheckout must be used within a CheckoutProvider');
    return context
}

