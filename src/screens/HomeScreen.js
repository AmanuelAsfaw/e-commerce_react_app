import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('/api/products')
            setProducts(data);
        }

        fetchProducts();
    },[]);
    
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                { products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={ product }/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomeScreen;