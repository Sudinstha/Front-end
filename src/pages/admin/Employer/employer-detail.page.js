import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import employerSvc from "../../../services/employer.service";
import LoadingComponent from "../../../component/loading/loading.component";
import { Container, Col, Row } from "react-bootstrap";
import { Headings } from "../../../component/typography/text.component";

const EmployerDetailPage = () => {
  let [detail, setDetail] = useState();
  let parmas = useParams();
  let [loading, setLoading] = useState(true);
  const loadEmployerDetail = useCallback(async () => {
    try {
      let response = await employerSvc.getEmployerBySlug(parmas.slug);
      setDetail(response.result);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  }, [parmas.slug]);

  useEffect(() => {
    loadEmployerDetail();
  }, [loadEmployerDetail]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Container className="my-5">
            <Row>
              <Headings level={1} title={"Profile"} className="text-center" />
              <p className="text-center"> Hi! I am {detail.name}</p>
              <Col sm={3}>
                <Row className="mt-5 ms-4">
                  <h4 className="ms-5 mt-3">Photo:</h4>
                  {detail.image && (
                    <img
                      className="circle ms-5"
                      src={process.env.REACT_APP_IMAGE_URL + "/" + detail.image}
                      alt=""
                    />
                  )}
                </Row>
              </Col>
              <Col className="mt-5 detail">
                <Headings level={2} title={"Detail"} />
                <hr />
                <div className="me-3">
                  <strong>Name:</strong>
                  <p>{detail.name}</p>
                  <strong>Email:</strong>
                  <p>{detail.email}</p>
                  <strong>Address:</strong>
                  <p>{detail.address}</p>
                  <strong>Phone:</strong>
                  <p>{detail.phone}</p>
                  <strong>Team:</strong>
                  <p>{detail.team.slug}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default EmployerDetailPage;
