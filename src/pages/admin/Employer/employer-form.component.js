import ActionButtons from "../../../component/form/action-button.component";
import {
  DropDownInputComponent,
  NumberInputComponent,
  SingleFileInputComponent,
  TextInputComponent,
} from "../../../component/form/input.component";
import { Form, Col } from "react-bootstrap";
import { useFormik } from "formik";
import teamSvc from "../../../services/team.service";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

const EmployerFormComponent = ({ submitForm, defaultData, create = true }) => {
  let [teams, setTeams] = useState();
  const loadAllTeams = useCallback(async () => {
    try {
      let response = await teamSvc.listAllTeams();
      if (response.result) {
        let opts = response.result.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        });
        setTeams(opts);
      }
    } catch (error) {
      console.log("TeamsFetchError: ", error);
    }
  }, []);
  useEffect(() => {
    loadAllTeams();
  }, [loadAllTeams]);
  let rules = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.number().required(),
    image: Yup.string().required(),
    team: Yup.object().required(),
    address: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: rules,
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
          label="Name:"
          name="name"
          value={formik.values?.name}
          placeholder="Enter your name"
          changeEvent={formik.handleChange}
          error={null}
          required={true}
        />

        <TextInputComponent
          label="Email:"
          name="email"
          value={formik.values?.email}
          placeholder="Enter your email"
          changeEvent={formik.handleChange}
          error={null}
          required={create}
        />
        <TextInputComponent
          label="Address:"
          name="address"
          value={formik.values?.address}
          placeholder="Enter your address"
          changeEvent={formik.handleChange}
          error={null}
          required={create}
        />

        <NumberInputComponent
          label="Phone:"
          name="phone"
          value={formik.values?.phone}
          placeholder="Enter your phone"
          changeEvent={formik.handleChange}
          error={null}
          required={create}
        />

        <DropDownInputComponent
          label="Team:"
          name="team"
          value={formik.values?.team}
          changeEvent={(selOpts) => {
            formik.setValues({
              ...formik.values,
              team: selOpts,
            });
          }}
          error={null}
          required={true}
          options={teams}
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

export default EmployerFormComponent;
