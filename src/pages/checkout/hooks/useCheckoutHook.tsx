import type { CartItem } from '@/types/cart.interface'
import type { DeliveryLocation } from '@/types/deliveryLocation.interface'
import type { GuestInfo } from '@/types/guestInfo.interface'
import type { Product } from '@/types/product.interface'
import { useMemo, useState } from 'react'
import axios from "axios";
import { toast } from 'sonner'

const ITEMS: Product[] = [
  {
    id: "1",
    name: "Leather Tote Bag",
    price: 189,
    image: "/images/product-1.jpg",
    category: "Accessories",
    description: "Premium full-grain leather tote with brass hardware.",
  },
  {
    id: "2",
    name: "Ceramic Pour-Over",
    price: 64,
    image: "/images/product-2.jpg",
    category: "Kitchen",
    description: "Hand-thrown matte black ceramic dripper.",
  },
  {
    id: "3",
    name: "Walnut Desk Organizer",
    price: 112,
    image: "/images/product-3.jpg",
    category: "Office",
    description: "Solid walnut organizer with divided compartments.",
  },
  {
    id: "4",
    name: "Linen Throw Blanket",
    price: 95,
    image: "/images/product-4.jpg",
    category: "Home",
    description: "Stonewashed European linen in warm oatmeal hue.",
  },
  {
    id: "5",
    name: "Geometric Candle Holder",
    price: 48,
    image: "/images/product-5.jpg",
    category: "Home",
    description: "Brass and glass with modern geometric silhouette.",
  },
  {
    id: " 6",
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

const useCheckoutForm = () => {
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
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) =>
      sum + item.product.price * item.quantity, 0
    )
  }, [cartItems])

  const handleClearCart = () => {
    setCartItems([]);
    setErrors({});
  }


  // 2. Memoize Total 
  // Depends on subtotal (which depends on cartItems)
  const total = useMemo(() => {
    const tax = subtotal * 0; // 100% tax based on your snippet logic
    const shipping = cartItems.length > 0 ? 0 : 0;
    return subtotal + tax + shipping;
  }, [subtotal, cartItems.length])

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
    // Prepare order data for backend
    const orderData = {
      payer: guestInfo.name,
      email: guestInfo.email,
      phone: guestInfo.phone,
      location: deliveryLocation,
      deliveryNotes: deliveryNotes,
      address: address,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    }
    setIsSubmitting(true);

    setTimeout(() => {

      axios.post('http://localhost:8080/checkout', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        const { ok, initPoint } = response.data;
        if (ok && initPoint) {
          window.location.href = initPoint;
        } else {
          toast.error('Hubo un problema al intentar procesar tu orden. Intenta nuevamente más tarde', { position: "bottom-right" })
        }
      }).catch((err) => {
        toast.error('Hubo un problema al intentar procesar tu método de pago. Intenta nuevamente más tarde', { position: "bottom-right" })
        console.log("req failed: ", err);
      }).finally(() => setIsSubmitting(false));
    }, 1500)
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
