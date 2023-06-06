import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { PasswordInputComponent } from "../../component/form/input.component";
import { Headings } from "../../component/typography/text.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authSvc from "./auth.service";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
 const navigate = useNavigate();
  let rules = Yup.object({
    email: Yup.string().email().required()
  });
  let formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: rules,
    onSubmit: async (values) => {
      try {
        await authSvc.forgetPassword(values);
        toast.success("Check your email")
        navigate("/reset-password")
      } catch (error) {
        throw error;
      }
      
    },
  });
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Headings level={2} title={"Reset Your Password"} />
          </Col>
        </Row>
        <hr />
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <PasswordInputComponent
                  label="Email:"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  changeEvent={formik.handleChange}
                  error={formik.errors.email}
                />

                <Form.Group className="row mb-3">
                  <Col sm={{ offset: 3, span: 9 }}>
                    <Button
                      variant="success"
                      type="submit"
                      size="md"
                      className="me-3"
                      
                    >
                      Send
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
export default ForgetPassword;
