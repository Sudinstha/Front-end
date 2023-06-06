import { Card } from "react-bootstrap";
import noImage from "../../assests/images/no-image.png";
import { NavLink } from "react-router-dom";
import TableActionButtons from "../tabel/tabel-action-button.component";
const SingleCardComponent = ({
  image = "",
  title = "",
  link = "",
  btnlink = "",
  deletebtn = "",
  id = "",
}) => {
  const imageErr = (e) => {
    e.target.src = noImage;
  };
  return (
    <Card border="primary">
      <img
        alt=""
        className="card-img-top "
        src={image}
        onError={imageErr}
      ></img>

      {title ? (
        <>
          <Card.Body className="py-1">
            {link ? (
              <Card.Title>
                <NavLink
                  className="text-primary text-center nav-link"
                  to={link}
                >
                  {title}{" "}
                </NavLink>
              </Card.Title>
            ) : (
              <>
                <Card.Title className="text-primary text-center">
                  {title}
                </Card.Title>
              </>
            )}
            <TableActionButtons
              editUrl={btnlink}
              deleteAction={deletebtn}
              id={id}
            />
          </Card.Body>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default SingleCardComponent;
