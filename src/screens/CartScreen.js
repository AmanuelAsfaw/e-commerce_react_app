import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
    const { id } = useParams();
    const [ searchParams, setSearchParamss ] = useSearchParams();
    const qty = searchParams.get('qty');
    
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems)
    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    },[dispatch, id, qty]);

    return (
        <div>
            Cart { JSON.stringify(cartItems)}
        </div>
    )
}

export default CartScreen;