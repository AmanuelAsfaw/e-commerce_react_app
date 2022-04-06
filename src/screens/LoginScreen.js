import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginAction } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [searchParams, ] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const history = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history(redirect? redirect : '')
        }
    }, [ history, userInfo, redirect ])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
        dispatch(loginAction(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && 
                <Message variant={'danger'}>{ error }</Message>
            }
            {loading &&
                <Loader/>
            }
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="email">
                    <FormLabel>Email Address</FormLabel>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <Button type='submit' variant="primary">Sign In</Button>
            </Form>            

            <Row className="py-3">
                <Col>
                    New Customer? <Link 
                    to={redirect? `/register?redirect=${redirect}`: '/register'}></Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default LoginScreen;