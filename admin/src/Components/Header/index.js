import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../Action/Auth.actions";


const Header = () => {

  const dispatch = useDispatch()
  const auth = useSelector((state)=>state.auth)

  const logout = ()=>{
    dispatch(signout())
  }

  
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

const renderLoggeInLinks=()=>{
  return(
    <Nav>
      <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
    </Nav>
  )
}

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container>
          <Link className="navbar-brand" to="/">CarT Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {auth.authenticate ? renderLoggeInLinks() : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
