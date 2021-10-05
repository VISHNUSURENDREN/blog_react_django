import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import './nav.css';


const Navigation=(props)=> {

    const isLoggedIn = props.isLoggedIn;
    const id = localStorage.getItem("id");
    const path = "/users/"+id;
    const profile = "Hii "+ localStorage.getItem("username") +"!!";

    const [border, setBorder] = useState("")

    useEffect(() => {
        document.addEventListener("scroll", () => {
            setBorder(window.scrollY > 50 ? "navbar-scroll" : "");
            
          });
    }, [])

    return (
        <Navbar fixed="top" className={border}  collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand href="/"><span>B</span>log<span>S</span>pace</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link className="color" href="/">Home</Nav.Link> */}
                </Nav>
                <Nav>
                
                {!isLoggedIn ? <Nav.Link className="color login" href="/login">Login</Nav.Link> : 
                <NavDropdown title={profile} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/postblog">Post Blogs</NavDropdown.Item>
                    <NavDropdown.Item href={path}>View Blogs</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
