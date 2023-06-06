import LoadingComponent from "../../../component/loading/loading.component";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Headings } from "../../../component/typography/text.component";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import teamSvc from "../../../services/team.service";
import EmployerCardGrid from "../../../component/card/single-employer-card.component";
import { toast } from "react-toastify";

const TeamEmployerList = () => {
  let [title, setTitle] = useState();
  let [employer, setEmployers] = useState();
  let params = useParams();
  let [loading, setLoading] = useState(true);
  let loadAllEmployers = useCallback(async () => {
    try {
      let response = await teamSvc.getEmployerByTeamSlug(params.teamSlug);
      setEmployers(response.result);
      let teamDetail = await teamSvc.listAllTeams();
      let teamTitle = [];

      teamDetail.result.forEach((item) => {
        if (item.slug === params.teamSlug) {
          teamTitle.push(item.title);
        }
      });
      setTitle(teamTitle);
    } catch (error) {
      console.log(error);
      toast.warning(error?.msg);
    } finally {
      setLoading(false);
    }
  }, [params.teamSlug]);

  useEffect(() => {
    loadAllEmployers();
  }, [loadAllEmployers]);
  return (
    <>
      <Container>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <Row className="my-5">
              <Col>
                <Headings level={1} className={"text-center "} title={title} />
                <hr />
              </Col>
            </Row>
            <Row>
              {employer && employer.length ? (
                <>
                  {employer.map((employer, index) => (
                    <EmployerCardGrid employer={employer} key={index} />
                  ))}
                </>
              ) : (
                <>
                  <Alert variant="danger">
                    Employer does not exists on the team. Try another team...
                  </Alert>
                </>
              )}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
export default TeamEmployerList;
