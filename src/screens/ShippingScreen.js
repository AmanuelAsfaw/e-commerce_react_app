import { useState } from "react"
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../actions/cartActions"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "./CheckoutSteps"

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    let history = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const submitHandler = (e) =>{
        e.preventDefault()
        console.log('submit Handler');
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history('/payment')
    }
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="address">
                    <FormLabel>Address</FormLabel>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Address"
                        value={address ? address: '' }
                        onChange={(e) => setAddress(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>
                
                <FormGroup controlId="city">
                    <FormLabel>City</FormLabel>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter City"
                        value={city ? city: '' }
                        onChange={(e) => setCity(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>
                
                <FormGroup controlId="postalCode">
                    <FormLabel>Postal-Code</FormLabel>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode ? postalCode: '' }
                        onChange={(e) => setPostalCode(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>
                
                <FormGroup controlId="country">
                    <FormLabel>Country</FormLabel>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Country"
                        value={country ? country: '' }
                        onChange={(e) => setCountry(e.target.value)}>
                        
                    </Form.Control>
                </FormGroup>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen