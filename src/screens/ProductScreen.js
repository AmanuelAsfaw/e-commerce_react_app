import { Card, Col, Image, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

function ProductScreen(props) {
    // access the parameter from current-url
    const { id } = useParams();
    const product = products.find((p) => p._id === id);
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
                            <ListGroupItem>
                                <Button className='btn-block' disabled={product.countInStock === 0 ? true : false} type='button'>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;