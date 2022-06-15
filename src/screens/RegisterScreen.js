import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { registerAction } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const [searchParams, ] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const history = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            console.log('redirect : '+ redirect)
            history(redirect? redirect : '/')
        }
    }, [ history, userInfo, redirect ])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(registerAction(name, email, password))
        }        
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            { message && 
                <Message variant={'danger'}>{ message }</Message>
            }
            { error && 
                <Message variant={'danger'}>{ error }</Message>
            }
            {loading &&
                <Loader/>
            }
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name">
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                        required
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId="email">
                    <FormLabel>Email Address</FormLabel>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId="passwordConfirm">
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <Button type='submit' variant="primary">Register</Button>
            </Form>            

            <Row className="py-3">
                <Col>
                    Have an Account? <Link 
                    to={redirect? `/login?redirect=${redirect}`: '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen