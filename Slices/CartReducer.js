import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalItems: 0,
    },
    reducers: {
        AddToCart: (state, action) => {
            console.log("add to cart", state.cart);

            const existingItem = state.cart.find(item => item.id === action.payload.id);

            if (existingItem) {
                const updatedCart = state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
        
                return {
                    ...state,
                    cart: updatedCart,
                    totalItems: state.totalItems + 1

                };
            } else {
                const newCart = [...state.cart, { ...action.payload, quantity: 1 }];
                return {
                    ...state,
                    cart: newCart,
                    totalItems: state.totalItems + 1,
                };
            }
        
        
        },
        removeFromCart: (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id)
            state.cart = removeFromCart;
            state.totalItems = state.totalItems - 1;
        },
        increamentQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            itemInCart.quantity++;
            state.totalItems++

        },
        decreamentQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart.quantity === 1) {
                const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id)
                state.cart = removeFromCart
                state.totalItems = state.totalItems - 1;
            }else{
                itemInCart.quantity--;
                 state.totalItems --;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalItems = 0; 
        },
    }
});

export const { AddToCart,removeFromCart,increamentQuantity,decreamentQuantity,clearCart} = cartSlice.actions 

export default cartSlice.reducer