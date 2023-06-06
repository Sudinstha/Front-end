import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Headings } from "../../component/typography/text.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authSvc from "./auth.service";
import { useNavigate, NavLink } from "react-router-dom";
import AppConstants from "../../config/constant";
import { useEffect, useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import LoadingComponent from "../../component/loading/loading.component";
import { useDispatch } from "react-redux";
import { setDetail } from "../../reducer/auth.reducer";
import image from "../../assests/images/welcome-removebg-preview.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let rules = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: rules,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let response = await authSvc.login(values);
        dispatch(setDetail(response.userDetail));
        toast.success("Login Successful");
        navigate("/" + response.userDetail.role);
      } catch (err) {
        console.error({ err });
        toast.error(err.data.msg);
      } finally {
        setLoading(false);
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
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Container className="col mb-6 mt-5">
          <Row>
            <Col>
              <NavLink
                to={"/"}
                className={"btn btn-sm btn-info me-1 button-edit"}
              >
                Back
              </NavLink>
            </Col>
            <Col>
              <Headings
                level={2}
                title={"Hello! Welcome back"}
                className="text-center"
              />
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <img
                src={image}
                alt=""
                className="img img-fluid"
                style={{ width: "700px", height: "350px" }}
              />
            </Col>
            <Col className="col-sm-7">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mb-4 mt-5">
                  <Form.Label className="col-sm-3">Email:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      className="col-sm-9"
                      name="email"
                      type="email"
                      size="sm"
                      onChange={formik.handleChange}
                      placeholder="Enter your username.."
                      required
                    />
                    <span className="text-danger">{formik.errors.email}</span>
                  </Col>
                </Form.Group>

                <Form.Group className="row mb-4">
                  <Form.Label className="col-sm-3">Password:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      className="col-sm-9"
                      name="password"
                      type="password"
                      size="sm"
                      onChange={formik.handleChange}
                      placeholder="Enter your Password.."
                      required
                    />
                    <span className="text-danger">
                      {formik.errors.password}
                    </span>
                  </Col>
                  <Col>
                    <NavLink className="nav-link mt-4" to="/forget-password">
                      Forget Password ?
                    </NavLink>
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
                      Cancel
                    </Button>
                    <Button
                      disabled={loading}
                      variant="success"
                      type="submit"
                      size="sm"
                      className="me-3"
                    >
                      {loading ? (
                        <>
                          <FaSpinner /> Loading..
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Login
                        </>
                      )}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default LoginPage;
