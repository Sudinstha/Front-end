import { NavLink, useNavigate } from "react-router-dom";
import AppConstants from "../../../config/constant";
import { Modal, Form, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { PasswordInputComponent } from "../../../component/form/input.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import authSvc from "../../auth/auth.service";
import ActionButtons from "../../../component/form/action-button.component";
import { toast } from "react-toastify";

const AdminTopNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  let navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem(AppConstants.AUTH_KEY);
    localStorage.removeItem(AppConstants.AUTH_USER_KEY);
    navigate("/login");
  };
  const passSchema = Yup.object({
    old_password: Yup.string().required(),
    new_password: Yup.string().min(8).required(),
    re_new_password: Yup.string()
      .min(8)
      .oneOf([
        Yup.ref("new_password"),
        null,
        "New password and confirm password doesnot match.",
      ])
      .required(),
  });
  const formik = useFormik({
    initialValues: {
      old_password: null,
      new_password: null,
      re_new_password: null,
    },
    validationSchema: passSchema,
    onSubmit: async (values) => {
      try {
        await authSvc.updatePassword(values);
        toast.success("Please login again with your new password");
        localStorage.removeItem(AppConstants.AUTH_KEY);
        localStorage.removeItem(AppConstants.AUTH_USER_KEY);
        navigate("/login");
      } catch (err) {
        console.log({ err });
      }
    },
  });

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <button
          onClick={handleClick}
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
          <i className="fas fa-bars"></i>
        </button>
        <NavLink className="navbar-brand ps-3" to="/admin">
          Employer Management Application
        </NavLink>

        <NavDropdown title="Teams" id="basic-nav-dropdown" className="navd">
          <NavLink
            className={"ps-3 dropdown-item"}
            to="/admin/team/web-development"
          >
            Web Development
          </NavLink>
          <NavLink className={"dropdown-item"} to="/admin/team/front-end-team">
            Front-End Development
          </NavLink>
          <NavLink className={"dropdown-item"} to="/admin/team/back-end-team">
            Back-End Development
          </NavLink>
          <NavLink
            className={"dropdown-item"}
            to="/admin/team/app-development-team"
          >
            App Development
          </NavLink>
          <NavLink className={"dropdown-item"} to="/admin/team/marketing-team">
            Marketing Team
          </NavLink>
          <NavLink className={"dropdown-item"} to="/admin/team/sales-team">
            Sales Team
          </NavLink>
          <NavDropdown.Divider />
        </NavDropdown>

        <NavLink className={"navs ms-5"} to="/admin/employer">
          Employer
        </NavLink>
        <div className="d-none d-md-inline-block  ms-auto me-0 me-md-3 my-2 my-md-0"></div>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a onClick={handleShow} className="dropdown-item" href="/">
                  Change Password
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a onClick={logout} className="dropdown-item" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PasswordInputComponent
              error={formik.errors.old_password}
              changeEvent={formik.handleChange}
              label="Old Password"
              name="old_password"
              placeholder="Enter current password"
            />
            <PasswordInputComponent
              error={formik.errors.new_password}
              changeEvent={formik.handleChange}
              label="New Password"
              name="new_password"
              placeholder="Enter your new password"
            />
            <PasswordInputComponent
              error={formik.errors.re_new_password}
              changeEvent={formik.handleChange}
              label="Confirm Password"
              name="re_new_password"
              placeholder="ReEnter your new password"
            />
          </Modal.Body>
          <Modal.Footer>
            <ActionButtons cancelText="Cancel" submitText="Update Password" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AdminTopNav;
