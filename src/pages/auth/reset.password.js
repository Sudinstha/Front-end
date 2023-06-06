/* import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { PasswordInputComponent } from "../../component/form/input.component";
import { Headings } from "../../component/typography/text.component";
import * as Yup from "yup";
import {useFormik} from "formik"
import {toast} from "react-toastify"

const ResetPassword = () => {
  let rules = Yup.object({
    new_password: Yup.string().min(8).required(),
    confirm_password: Yup.string().min(8).oneOf([Yup.ref('new_password'),null, "New password and confirm password doesnot match."]).required()
  });
  let formik = useFormik({
    initialValues: {
      new_password: null,
      confirm_password: null
    },
    validationSchema: rules,
    onSubmit: async (values) => {
      try {
        toast.success("Login")
      } catch (error) {
        throw error;
      }
      
    },
  });

    return(<>
       <Container>
        <Row>
          <Col>
            <Headings level={2} title={"Enter New Password"} />
          </Col>
        </Row>
        <hr />
        <Form ons>
          <Form.Group>
            <Row>
              <Col>
                <PasswordInputComponent
                  label="New Password:"
                  placeholder="Enter your new password"
                />
                <PasswordInputComponent
                  label="Confirm Password:"
                  placeholder="Re-enter you new password"
                />

                <Form.Group className="row mb-3">
                  <Col sm={{ offset: 3, span: 9 }}>
                    <Button
                      variant="success"
                      type="submit"
                      size="md"
                      className="me-3"
                    >
                      Save
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
)}

export default ResetPassword; */