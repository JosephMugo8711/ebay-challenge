"use client"

import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";


// Create a new context for the cart state and methods
const Context = createContext();

// Create a provider component to manage the cart state and methods
const Provider = ({ children }) => {
  const router = useRouter() // Get the router instance for navigation


    // State to track if an item is added to the cart
    const [isItemAdded, setIsItemAdded] = useState(false)

    // Method to get the current cart items from localStorage
    const getCart = () => {
      let cart = []
      if (typeof localStorage !== "undefined") {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
      return cart
    }

    // Method to add a product to the cart
    const addToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
          cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // reset localstorage to update cart
        isItemAddedToCart(product)
        router.refresh() // Reload the page to reflect the updated cart
    }

    // Method to remove a product from the cart
    const removeFromCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
          cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        cart = cart.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product)
        router.refresh() // Reload the page to reflect the updated cart
    } 
    
    // Method to check if an item is already added to the cart
    const isItemAddedToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
          cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        cart = cart.filter(item => item.id === product.id);
    
        if (cart.length > 0) {
          setIsItemAdded(true)
          return
        }
    
        setIsItemAdded(false)
    } 

    // Method to get the total number of items in the cart
    const cartCount = () => {
      let cart = []
      if (typeof localStorage !== "undefined") {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
      return cart.length
    }

  // Method to calculate the total price of items in the cart
    const cartTotal = () => {
      let total = 0
      let cart = []
      if (typeof localStorage !== "undefined") {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
      for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total += element.price
      }

      return total
  }

// Method to clear the cart by removing all items from localStorage
  const clearCart = () => {
    localStorage.removeItem('cart')
    router.refresh()
  }

   // Expose the cart state and methods through context
  const exposed = { 
    isItemAdded, 
    getCart, 
    addToCart, 
    removeFromCart, 
    isItemAddedToCart, 
    cartCount, 
    cartTotal, 
    clearCart 
  };

   // Provide the exposed values to the children components
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

// Custom hook to consume the cart context
export const useCart = () => useContext(Context);

export default Provider;