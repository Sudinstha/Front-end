import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Headings } from "../../component/typography/text.component";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import AppConstants from "../../config/constant";
import { NavLink, useNavigate } from "react-router-dom";
import authSvc from "./auth.service";
import image from "../../assests/images/Register-removebg-preview.png";
import { toast } from "react-toastify";

import { setDetail } from "../../reducer/auth.reducer";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let defaultData = {
    name: "",
    email: "",
    password: "",
    role: "",
    confirm_password: "",
  };

  let rules = Yup.object({
    name: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    role: Yup.string()
      .matches(/(admin|user)/)
      .default("user"),
    confirm_password: Yup.string().min(8).required(),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: rules,
    onSubmit: async (values) => {
      try {
        let response = await authSvc.register(values);
        dispatch(setDetail(response.userDetail));
        toast.success("Register Successful");
        navigate("/login");
      } catch (err) {
        console.log("RegisterLog: ", err);
      }
    },
  });

  useEffect(() => {
    let token = localStorage.getItem(AppConstants.AUTH_KEY);
    let user = JSON.parse(localStorage.getItem(AppConstants.AUTH_USER_KEY));
    if (token && user) {
      navigate("/" + user.role);
    }
  }, [navigate]);
  console.log(formik.errors);
  console.log(formik.values);
  return (
    <>
      <Container className="my-5 fluid">
        <Row>
          <Col className="col-sm-7">
            <Headings
              className={"text-center"}
              level={1}
              title={"Create An Account"}
            ></Headings>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-4 mt-5">
                <Form.Label className="col-sm-3">Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="name"
                    required={true}
                    onChange={formik.handleChange}
                    className="form-control form-control-sm"
                    placeholder="Enter your name.."
                  />
                  <span className="text-danger">{formik.errors?.name}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-4">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    name="email"
                    required={true}
                    onChange={formik.handleChange}
                    size="sm"
                    placeholder="Enter your email.."
                  />
                  <span className="text-danger">{formik.errors?.email}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-4">
                <Form.Label className="col-sm-3">Role:</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    size="sm"
                    required
                    name="role"
                    onChange={formik.handleChange}
                  >
                    <option>--Select Any One--</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"user"}>User</option>
                  </Form.Select>
                  <span className="text-danger"></span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-4">
                <Form.Label className="col-sm-3">Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    onChange={formik.handleChange}
                    size="sm"
                    placeholder="Enter your password.."
                  />
                  <span className="text-danger"></span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-4">
                <Form.Label className="col-sm-3">Confirm Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="confirm_password"
                    name="confirm_password"
                    required
                    onChange={formik.handleChange}
                    size="sm"
                    placeholder="Confirm your password.."
                  />
                  <span className="text-danger"></span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <Button
                    variant="danger"
                    type="reset"
                    size="sm"
                    className="me-3"
                  >
                    <i className="fa fa-trash"></i>Cancel
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    size="sm"
                    className="me-3"
                  >
                    <i className="fa fa-paper-plane"></i>Register
                  </Button>
                </Col>
              </Form.Group>
            </form>
          </Col>
          <Col>
            <Col>
              <NavLink
                to={"/"}
                className={"btn btn-sm btn-info me-1 button-edit float-end"}
              >
                Back
              </NavLink>
            </Col>
            <img src={image} alt="" className="img img-fluid" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
