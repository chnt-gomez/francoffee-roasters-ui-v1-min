import type { CartItem } from '@/types/cart.interface'
import type { DeliveryLocation } from '@/types/deliveryLocation.interface'
import type { GuestInfo } from '@/types/guestInfo.interface'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { preCheckout } from '@/actions/checkout/pre-checkout.action'
import { applyCheckout } from '@/actions/checkout/apply-checkout.action'

const useCheckoutForm = (initialCartItems: CartItem[]) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
  })
  const [address, setAddres] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [serverTotal, setServerTotal] = useState<number | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (initialCartItems.length === 0) {
      return
    }
    preCheckout(initialCartItems)
      .then((order) => {
        setCartItems((prev) =>
          prev.map((cartItem) => {
            const serverItem = order.items.find((i) => i.productId === cartItem.product.id)
            if (serverItem) {
              return { ...cartItem, product: { ...cartItem.product, price: serverItem.price } }
            }
            return cartItem
          })
        )
        setServerTotal(order.totalAmount)
        setOrderId(order.orderId)
      })
      .catch(() => {
        toast.error('No se pudo verificar el precio de los productos. Intenta nuevamente.', { position: 'bottom-right' })
      })
      .finally(() => setIsLoadingPrices(false))
  }, [initialCartItems])

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) =>
      sum + item.product.price * item.quantity, 0
    )
  }, [cartItems])

  const handleClearCart = () => {
    setCartItems([]);
    setErrors({});
  }


  const total = serverTotal ?? subtotal

  const handleRemoveCartItem = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      // 1. Map through items to update quantities
      const updatedItems = prevItems.map((item) => {
        // Compare IDs (using == to handle string vs number safely)
        if (item.product.id == productId) {
          return {
            ...item,
            quantity: item.quantity - quantity,
          };
        }
        return item;
      });

      // 2. Filter out any items that now have a quantity of 0 or less
      return updatedItems.filter((item) => item.quantity > 0);
    });
  }

  const handleGuestInfoChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));

    // Automatically clear the error for this field when the user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }

  const handleAddressChange = (address: string) => {
    setAddres(address);
    // Clear error for address
    if (errors['address']) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors['address'];
        return newErrors;
      });
    }
  }

  const handleDeliverynotesChange = (notes: string) => {
    setDeliveryNotes(notes);
  }

  const handleDeliveryLocationChanged = (location: { lat: number; lng: number }) => {
    setDeliveryLocation(location)
  }

  const handleConfirmCheckout = () => {
    if (validateForm()) {
      return;
    }

    setIsSubmitting(true);

    applyCheckout({
      email: guestInfo.email,
      payer: guestInfo.name,
      orderId: orderId!,
      address,
      location: {
        type: 'Point',
        coordinates: [deliveryLocation!.lng, deliveryLocation!.lat],
      },
      deliveryNotes,
    })
      .then(({ checkoutUrl }) => {
        window.location.href = checkoutUrl;
      })
      .catch(() => {
        toast.error('Hubo un problema al intentar procesar tu método de pago. Intenta nuevamente más tarde', { position: 'bottom-right' })
      })
      .finally(() => setIsSubmitting(false));
  }

  const validateForm = () => {

    const newErrors: { [key: string]: string } = {}

    if (!guestInfo.name.trim()) {
      newErrors.name = "Es necesario su nombre"
    }

    if (!address.trim()) {
      newErrors.address = "Se necesita una dirección para realizar la entrega"
    }

    if (!guestInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!guestInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (cartItems.length === 0) {
      newErrors.cart = "Your cart is empty"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  }

  return {
    cartItems,
    errors,
    isSubmitting,
    isLoadingPrices,
    guestInfo,
    address,

    subtotal,
    total,

    validateForm,
    handleClearCart,
    handleConfirmCheckout,
    handleGuestInfoChange,
    handleAddressChange,
    handleDeliverynotesChange,
    handleDeliveryLocationChanged,
    handleRemoveCartItem
  }
}

export default useCheckoutForm
