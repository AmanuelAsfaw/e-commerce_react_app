import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";

function HomeScreen() {
    const dispatch = useDispatch();
    const { error, loading, products } = useSelector(state => state.productList);

    useEffect(() => {
        function dispatch_fun(list){

              dispatch(list);
        }
        dispatch_fun(listProducts);
    },[]);

    return (
        <div>
            <h1>Latest Products</h1>
            { loading? <h2>LOADING...</h2>
                : error? <h3>{error}</h3>
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
