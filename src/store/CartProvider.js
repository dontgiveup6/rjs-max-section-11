import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const found = state.items.find((item) => item.id === action.item.id);
    let indexOf = state.items.indexOf(found);

    const updateItems = state.items.concat(action.item);

    let updateAmount;
    if (found) {
      updateItems.splice(indexOf, 1);

      updateAmount =
        state.totalAmount +
        action.item.price * action.item.amount -
        found.amount * found.price;
    } else {
      updateAmount = state.totalAmount + action.item.price * action.item.amount;
    }

    return { items: updateItems, totalAmount: +updateAmount.toFixed(2) };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
