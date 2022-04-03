import { useEffect } from "react";
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

function CartScreen() {
    const { id } = useParams();
    const [ searchParams, ] = useSearchParams();
    const qty = searchParams.get('qty');
    let history = useNavigate();
    
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems)
    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    },[dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        console.log('remove : ', id);
        dispatch(removeFromCart(id))
    }
    
    const checkoutHandler = () => {
        console.log('redirect to shipping');
        history('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message variant={'info'}>
                            Your cart is empty <Link to={'/'}>Go Back</Link>
                        </Message>
                    ):(
                        <ListGroup variant="flush">
                            {
                                cartItems.map(item => (
                                    <ListGroupItem key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={'/product/'+item.product}>{item.name}</Link>
                                            </Col>
                                            <Col>${item.price}</Col>
                                            <Col md={3}>
                                                <Form.Control 
                                                    as="select" 
                                                    value={item.qty}
                                                    onChange={ (e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))
                                                        }
                                                </Form.Control>
                                            </Col>
                                            <Col md={1}>
                                                <Button 
                                                    type="button"
                                                    variant="light"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Subtotal ({ cartItems.reduce((acc, item) => acc+item.qty, 0)}) items</h2>
                            ${ cartItems.reduce((acc, item) => acc+item.qty * item.price, 0).toFixed(3)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                                    Proceed To Checkout
                                </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;