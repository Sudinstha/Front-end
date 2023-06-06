import { Container, Row, Col } from "react-bootstrap";
import { Headings } from "../../component/typography/text.component";
import SingleCardComponent from "../../component/card/single-card.component";
import { useCallback, useEffect, useState } from "react";
import teamSvc from "../../services/team.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const SingleTeamGridItem = ({
  image = null,
  title = null,
  link = null,
  btnlink = null,
  deletebtn = null,
  id = null,
}) => {
  return (
    <>
      <Col sm={6} md={2} className="p-1">
        <SingleCardComponent
          title={title}
          image={image}
          link={link}
          btnlink={btnlink}
          deletebtn={deletebtn}
          id={id}
        ></SingleCardComponent>
      </Col>
    </>
  );
};
const TeamListGridComponent = ({ fluid = true }) => {
  let [TeamList, setTeamList] = useState();
  const navigate = useNavigate();
  const handleTeamDelete = async (id) => {
    try {
      let response = await teamSvc.deleteTeam(id);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/team");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Error deleting team");
    }
  };

  let getActiveTeam = useCallback(async () => {
    try {
      let response = await teamSvc.listAllTeams();
      setTeamList(response.result);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getActiveTeam();
  }, [getActiveTeam]);

  return (
    <>
      <Container className="my-4" fluid={fluid}>
        <Row>
          <Col sm={12} md={12}>
            <Headings level={3} title={"Team List"} className={"text-center"} />
          </Col>
        </Row>

        <Row>
          {TeamList &&
            TeamList.map((team, ind) => (
              <>
                <SingleTeamGridItem
                  key={ind}
                  link={"/admin/team/" + team.slug}
                  title={team.title}
                  image={process.env.REACT_APP_IMAGE_URL + "/" + team.image}
                  btnlink={"/admin/team/edit/" + team._id}
                  deletebtn={handleTeamDelete}
                  id={team._id}
                />
              </>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default TeamListGridComponent;
