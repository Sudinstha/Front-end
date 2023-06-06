import { Nav, Navbar, Container, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AppConstants from "../../config/constant";

const HomeMenu = () => {
  let user = JSON.parse(localStorage.getItem(AppConstants.AUTH_USER_KEY));
  return (
    <>
      <Navbar expand="lg" className="sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className={"nav-link"} to="/">
                Home
              </NavLink>
            </Nav>
            <Form className="d-flex"></Form>
            <Nav>
              {user ? (
                <>
                  {" "}
                  <NavLink className={"nav-link"} to={"/" + user.role}>
                    {user.name}
                  </NavLink>
                </>
              ) : (
                <>
                  {" "}
                  <NavLink className={"nav-link"} to="/login">
                    Login
                  </NavLink>
                  <NavLink className={"nav-link"} to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default HomeMenu;
