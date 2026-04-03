import React, { createContext, useContext } from 'react'
import useCheckoutHook from '../hooks/useCheckoutHook';

const CheckoutContext = createContext<ReturnType<typeof useCheckoutHook> | null>(null);

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
    const checkout = useCheckoutHook();
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

