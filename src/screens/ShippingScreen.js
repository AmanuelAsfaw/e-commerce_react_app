import { useState } from "react"
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap"
import FormContainer from "../components/FormContainer"

function ShippingScreen() {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    
    const submitHandler = (e) =>{
        e.preventDefault()
        console.log('submit Handler');
    }
    
    return (
        <FormContainer>
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