import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'

import store from '../store'

import { searchQuery } from '../actions'

const Header = () => {
    const [query, setQuery] = useState('')

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        store.dispatch( searchQuery(query) )
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                        value={query}
                        onChange={handleQueryChange}
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header