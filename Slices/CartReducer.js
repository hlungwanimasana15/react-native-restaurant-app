import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
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
                };
            } else {
                const newCart = [...state.cart, { ...action.payload, quantity: 1 }];
                return {
                    ...state,
                    cart: newCart,
                };
            }
        
            // state.cart.push({ ...action.payload, quantity: 1 })
            // // const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            // if (itemInCart) {
            //     // console.log(' state.cart', itemInCart);
            //     itemInCart.quantity++
                
            // } else {
            //     // console.log(' state.cart2', itemInCart);
            //     state.cart.push({ ...action.payload, quantity: 1 })
            // }
        },
        removeFromCart: (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id)
            state.cart = removeFromCart
        },
        increamentQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            itemInCart.quantity++;
        },
        decreamentQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart.quantity == 1) {
                const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id)
                state.cart = removeFromCart
            }else{
                itemInCart.quantity--;
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
});

export const { AddToCart,removeFromCart,increamentQuantity,decreamentQuantity,clearCart} = cartSlice.actions 

export default cartSlice.reducer