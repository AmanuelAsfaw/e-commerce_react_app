import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"
import { USER_UPDATE_PROFILE_RESET } from "../actions/types";
import { getUserDetails, updateUserProfileAction } from "../actions/userActions";
import Message from "../components/Message";

function ProfileScreen() {
    let history = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const [searchParams, ] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            console.log('redirect to login');
            history('/login')
        }else {
            if (!user || !user.name || success){
                dispatch({ type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [ dispatch, history, userInfo, user, success ])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            setMessage('') 
            dispatch(updateUserProfileAction({
                id: user._id,
                name: name,
                email: email,
                password: password
            }))
        }        
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
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
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                            
                        </Form.Control>
                    </FormGroup>

                    <FormGroup controlId="passwordConfirm">
                        <FormLabel>Password</FormLabel>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                            
                        </Form.Control>
                    </FormGroup>

                    <Button type='submit' variant="primary">Update</Button>
                </Form>            

            </Col>
            <Col md={3}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen