import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

function HomeScreen() {
    const dispatch = useDispatch();
    const { error, loading, products } = useSelector(state => state.productList);

    useEffect(() => {
        function dispatch_fun(list){

              dispatch(list);
        }
        dispatch_fun(listProducts);
    },[dispatch]);

    return (
        <div>
            <h1>Latest Products</h1>
            { loading? <h2><Loader/></h2>
                : error? <h3><Message variant={'danger'}>{error}</Message></h3>
                    :
                    <Row>
                        { products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={ product }/>
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    );
}

export default HomeScreen;
