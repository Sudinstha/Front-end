import ActionButtons from "../../../component/form/action-button.component";
import {
  SingleFileInputComponent,
  TextInputComponent,
} from "../../../component/form/input.component";
import { Form, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useEffect } from "react";
const TeamFormComponent = ({ submitForm, defaultData }) => {
  //Data /state manage
  console.log(defaultData);
  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: null,
    onSubmit: (data) => {
      submitForm(data);
    },
  });
  useEffect(() => {
    if (defaultData) {
      formik.setValues({
        ...defaultData,
      });
    }
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <TextInputComponent
          label=" Team Title:"
          name="title"
          value={formik.values?.title}
          placeholder="Enter your title"
          changeEvent={formik.handleChange}
          error={null}
          required={true}
        />

        <SingleFileInputComponent
          label="Image:"
          name="image"
          thumb={
            formik.values && formik.values.image
              ? typeof formik.values.image === "string"
                ? process.env.REACT_APP_IMAGE_URL + "/" + formik.values.image
                : URL.createObjectURL(formik.values.image)
              : null
          }
          changeEvent={(selFile) => {
            formik.setValues({
              ...formik.values,
              image: selFile,
            });
          }}
          error={null}
          required={false}
        />
        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <ActionButtons cancelText="Cancel" submitText="Submit" />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default TeamFormComponent;
