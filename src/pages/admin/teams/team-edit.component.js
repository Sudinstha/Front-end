import { toast } from "react-toastify";
import teamSvc from "../../../services/team.service";
import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import TeamFormComponent from "./team-form.component";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const TeamEdit = () => {
  let params = useParams();
  let [detail, setDetail] = useState();
  const navigate = useNavigate();
  // TODO : Submission event
  const submitData = async (data) => {
    try {
      let response = await teamSvc.updateTeam(data, params.id);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/team");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };
  const getTeamById = useCallback(async () => {
    try {
      let data = await teamSvc.getTeamById(params.id);
      setDetail({
        title: data.result.title,
        image: data.result.image,
      });
    } catch (err) {
      console.error(err);
    }
  }, [params.id]);
  useEffect(() => {
    getTeamById();
  }, [getTeamById]);
  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          pageTitle={"Team Update"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Team List",
              link: "/admin/team",
            },
            {
              title: "Team Edit",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TeamFormComponent submitForm={submitData} defaultData={detail} />
          </div>
        </div>
      </div>
    </>
  );
};
export default TeamEdit;
