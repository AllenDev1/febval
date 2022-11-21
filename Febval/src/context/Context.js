import {
	createContext,
	useReducer,
	useEffect,
	useState,
	useContext,
} from "react";
import axios from "axios";
import { cartReducer } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, {
		cart: [],
		loading: true,
	});
	const [total, setTotal] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	// useEffect(() => {
	// 	dispatch({ type: "LOADING" });
	// 	axios

	// 		.get("api/cart/create")
	// 		.then((res) => {
	// 			dispatch({ type: "GET_CART", payload: res.data });
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);

	useEffect(() => {
		let items = 0;
		let price = 0;
		state.cart.forEach((item) => {
			items += item.quantity;
			price += item.price * item.quantity;
		});
		setTotal(price);
		setTotalItems(items);
	}, [state.cart]);

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};

	const removeFromCart = (id) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: id });
	};

	const increaseQuantity = (id) => {
		dispatch({ type: "INCREASE_QUANTITY", payload: id });
	};

	const decreaseQuantity = (id) => {
		dispatch({ type: "DECREASE_QUANTITY", payload: id });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	return (
		<>
			<Cart.Provider value={{ state, dispatch }}>
				{children}
			</Cart.Provider>
		</>
	);
};

export default Context;

export const CartState = () => {
	return useContext(Cart);
};
