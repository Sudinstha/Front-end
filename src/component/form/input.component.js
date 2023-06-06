import { Form, Col, Image, Row } from "react-bootstrap";
import Select from "react-select";

export const PasswordInputComponent = ({
  label = "Password",
  type = "password",
  name = "password",
  placeholder = "Enter your password",
  changeEvent,
  error = null,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            type={type}
            name={name}
            size="sm"
            placeholder={placeholder}
            required={true}
            onChange={changeEvent}
          />
          <span className="text-danger">{error}</span>
        </Col>
      </Form.Group>
    </>
  );
};

export const TextInputComponent = ({
  label = "Title",
  name = "name",
  placeholder = "Enter your password",
  changeEvent,
  error = null,
  value = "",
  required = false,
  type = "text",
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            type={type}
            name={name}
            size="sm"
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={changeEvent}
          />
          <span className="text-danger">{error}</span>
        </Col>
      </Form.Group>
    </>
  );
};
export const NumberInputComponent = ({
  label = "Title",
  name = "name",
  placeholder = "Enter your Phone number",
  changeEvent,
  error = null,
  value = "",
  required = false,
  type = "text",
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            type={type}
            name={name}
            size="sm"
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={changeEvent}
          />
          <span className="text-danger">{error}</span>
        </Col>
      </Form.Group>
    </>
  );
};
export const DropDownInputComponent = ({
  label = "Title",
  name = "name",
  changeEvent,
  error = null,
  required = false,
  options = null,
  value = null,
  isMulti = false,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Select
            name={name}
            required={required}
            onChange={changeEvent}
            isMulti={isMulti}
            placeholder={"Select Any one"}
            options={options}
            value={value}
            isClearable={true}
          ></Select>
          <span className="text-danger">{error}</span>
        </Col>
      </Form.Group>
    </>
  );
};

export const SingleFileInputComponent = ({
  label = "Title",
  name = "name",
  changeEvent,
  thumb = null,
  error = null,
  required = false,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={5}>
          <Form.Control
            type="file"
            name={name}
            size="sm"
            required={required}
            onChange={(e) => {
              let selFile = e.target.files[0];
              changeEvent(selFile);
            }}
            accept="image/*"
          />
          <span className="text-danger">{error}</span>
        </Col>
        <Col sm={3}>{thumb ? <Image fluid alt="" src={thumb} /> : <></>}</Col>
      </Form.Group>
    </>
  );
};

export const MultipleFileInputComponent = ({
  label = "Title",
  name = "name",
  changeEvent,
  thumb = null,
  error = null,
  required = false,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="file"
            name={name}
            size="sm"
            multiple={true}
            required={required}
            onChange={(e) => {
              let selFile = e.target.files;
              changeEvent(Object.values(selFile));
            }}
            accept="image/*"
          />
          <span className="text-danger">{error}</span>
        </Col>
      </Form.Group>
      {thumb ? (
        <>
          <Form.Group>
            <Row>
              {thumb.map((item, index) => (
                <Col key={index} sm={4} md={1}>
                  <img className="img img-fluid" src={item} alt="" />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const SwitchInputComponent = ({
  label,
  name,
  textDisplay = "No",
  required = false,
  changeEvent,
  error = null,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col size={9}>
          <Form.Check
            type="switch"
            id={name}
            label={textDisplay}
            onChange={changeEvent}
            required={required}
          />
        </Col>
        <span className="text-danger">{error}</span>
      </Form.Group>
    </>
  );
};
