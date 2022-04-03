import { useState, useEffect } from "react";
import { Card, Col, Image, ListGroup, ListGroupItem, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailProduct } from "../actions/productActions";
import Rating from "../components/Rating";

function ProductScreen(props) {
    // access the parameter from current-url
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ qty, setQty ] = useState(1);

    const { error, loading, product } = useSelector(state => state.productDetails);
    let history = useNavigate();


    useEffect(() => {
        function fetchProducts() {
            dispatch(detailProduct(id));
        }

        fetchProducts();
    },[id]);

    const addToCartHandler = () => {
        console.log('add to cart '+id);
        history(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to={'/'} className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={ product.name } />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating value={ product.rating } text={product.numReviews+ ' reviews'} color="#f8e825"/>
                        </ListGroupItem>

                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>

                        <ListGroupItem>
                            Description: ${product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                        <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${ product.price }</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        { product.countInStock > 0? 'In Stock' :'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            {
                                product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className="my-1">
                                                <Form.Control 
                                                    as="select" 
                                                    value={qty}
                                                    onChange={ (e)=> setQty(e.target.value )}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )
                            }

                            <ListGroupItem>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block'
                                    disabled={product.countInStock === 0 ? true : false}
                                    type='button'>
                                        Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;
