import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addProduct: (state, action) => {
			const { product, quantity } = action.payload;
			let currentProducts = [...state.products];

			// Create new product obj
			let newProduct = {
				product: product,
				quantity: quantity,
			};

			// Check if product already exists
			let oldProduct = currentProducts.filter(
				(item) => item.product.id === product.id
			);
			// if (oldProduct.length !== 0) {
			// 	// Increment the count of the newProduct
			// 	newProduct.quantity += oldProduct.quantity;
			// }
			// Make array of products that are different from newProduct
			let newProducts = currentProducts.filter(
				(item) => item.product.id !== product.id
			);

			// Push new product to newProducts
			newProducts.push(newProduct);

			// Set state
			state.products = newProducts;
		},

		removeProduct: (state, action) => {
			const { product } = action.payload;
			// Make a copy of the products array
			let currentProducts = [...state.products];

			// Filter out those products that has matching id
			let newProducts = currentProducts.filter(
				(item) => item.product.id !== product.id
			);

			// Update the state
			state.products = newProducts;
		},

		// clear cart
		clearCart: (state) => {
			state.products = [];
		},
	},
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
