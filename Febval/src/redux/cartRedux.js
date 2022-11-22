import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addProduct: (state, action) => {
			const { product } = action.payload;
			let currentProducts = [...state.products];

			// Create new product obj
			let newProduct = {
				product: product,
				quantity: 1,
			};

			// Check if product already exists
			if (
				currentProducts.filter((item) => item.product.id === product.id)
					.length !== 0
			) {
				// Increment the count of the newProduct
				newProduct.quantity += 1;
			}

			// Make array of products that are different from newProduct
			let newProducts = currentProducts.filter(
				(item) => item.product.id !== product.id
			);

			// Push new product to newProducts
			newProducts.push(newProduct);

			// Set state
			state.products = newProducts;
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
