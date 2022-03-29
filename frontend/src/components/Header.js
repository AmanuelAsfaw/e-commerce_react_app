import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
    return (
        <footer>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="#home">Adey-Abeba</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            <Nav.Link href="/login"><i className="fas fa-user"></i>Login</Nav.Link>                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </footer>
    );
}

export default Header;