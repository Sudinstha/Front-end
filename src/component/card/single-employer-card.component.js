import { Badge, Card, Col } from "react-bootstrap";
import noImage from "../../assests/images/no-image.png";
import { NavLink } from "react-router-dom";

const EmployerCardGrid = ({ employer }) => {
  const imageErr = (e) => {
    e.target.src = noImage;
  };
  return (
    <>
      <Col sm={6} md={3}>
        <Card border="primary">
          <img
            alt=""
            className="card-img-top"
            src={process.env.REACT_APP_IMAGE_URL + "/" + employer.image}
            onError={imageErr}
          ></img>

          <Card.Body className="py-1">
            <Card.Title>
              <NavLink
                className="text-primary text-center nav-link"
                to={"/admin/employer/" + employer.slug}
              >
                {employer.name}
              </NavLink>
            </Card.Title>

            <p>
              {employer.team ? (
                <>
                  {employer.team.map((item, ind) => {
                    return (
                      <Badge bg="warning me-1" key={ind}>
                        <NavLink
                          className={"text-white"}
                          style={{ textDecoration: "none" }}
                        >
                          {item.title}
                        </NavLink>
                      </Badge>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </p>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default EmployerCardGrid;
