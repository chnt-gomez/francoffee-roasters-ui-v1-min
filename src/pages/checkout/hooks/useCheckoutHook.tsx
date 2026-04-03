import type { CartItem } from '@/types/cart.interface'
import type { DeliveryLocation } from '@/types/deliveryLocation.interface'
import type { GuestInfo } from '@/types/guestInfo.interface'
import type { Product } from '@/types/product.interface'
import { useMemo, useState } from 'react'

const ITEMS: Product[] = [
  {
    id: 1,
    name: "Leather Tote Bag",
    price: 189,
    image: "/images/product-1.jpg",
    category: "Accessories",
    description: "Premium full-grain leather tote with brass hardware.",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over",
    price: 64,
    image: "/images/product-2.jpg",
    category: "Kitchen",
    description: "Hand-thrown matte black ceramic dripper.",
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    price: 112,
    image: "/images/product-3.jpg",
    category: "Office",
    description: "Solid walnut organizer with divided compartments.",
  },
  {
    id: 4,
    name: "Linen Throw Blanket",
    price: 95,
    image: "/images/product-4.jpg",
    category: "Home",
    description: "Stonewashed European linen in warm oatmeal hue.",
  },
  {
    id: 5,
    name: "Geometric Candle Holder",
    price: 48,
    image: "/images/product-5.jpg",
    category: "Home",
    description: "Brass and glass with modern geometric silhouette.",
  },
  {
    id: 6,
    name: "Stoneware Mug Set",
    price: 72,
    image: "/images/product-6.jpg",
    category: "Kitchen",
    description: "Set of two hand-glazed stoneware mugs.",
  },
]

const CART_ITEMS: CartItem[] = [
  {
    product: ITEMS[0],
    quantity: 1
  },
  {
    product: ITEMS[1],
    quantity: 1
  },
  {
    product: ITEMS[2],
    quantity: 1
  },
  {
    product: ITEMS[3],
    quantity: 1
  }
]

const useCheckoutHook = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS)
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
  })
  const [address, setAddres] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) =>
      sum + item.product.price * item.quantity, 0
    )
  }, [cartItems])

  // 2. Memoize Total 
  // Depends on subtotal (which depends on cartItems)
  const total = useMemo(() => {
    const tax = subtotal * 1; // 100% tax based on your snippet logic
    const shipping = cartItems.length > 0 ? 0 : 0;
    return subtotal + tax + shipping;
  }, [subtotal, cartItems.length])

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
  }

  const handleConfirmCheckout = () => {

    if (validateForm()) {
      return;
    }



    // Prepare order data for backend
    const orderData = {
      guest: guestInfo,
      delivery: deliveryLocation,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      totals: {
        subtotal: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        shipping: 0,
        tax:
          cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ) * 1,
      },
    }

    setIsSubmitting(true);
    setTimeout(async () => {

      const response = await fetch(`http://localhost:8080/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error procesando el pago');
      }

      if (data.ok && data.initPoint) {
        window.location.href = data.initPoint;
      }


      setIsSubmitting(false)
    }, 1500)
  }

  const validateForm = () => {

    const newErrors: { [key: string]: string } = {}

    if (!guestInfo.name.trim()) {
      newErrors.name = "Es necesario su nombre"
    }

    if (!guestInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!guestInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!deliveryLocation) {
      newErrors.location = "Please select a delivery location on the map"
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
    guestInfo,
    tax,
    shipping,
    address,

    subtotal,
    total,

    validateForm,
    handleConfirmCheckout,
    handleGuestInfoChange,
    handleAddressChange,
  }
}

export default useCheckoutHook
