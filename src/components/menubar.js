import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Menubar() {
  return (
    <>
      <Navbar fixed="top" bg="dark" expand="lg" variant={"dark"}>
        <Container>
          <Navbar.Brand href="/">Todo List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/todo">Todo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
