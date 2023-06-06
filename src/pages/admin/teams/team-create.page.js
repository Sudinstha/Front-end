import { toast } from "react-toastify";
import teamSvc from "../../../services/team.service";
import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import TeamFormComponent from "./team-form.component";
import { useNavigate } from "react-router-dom";

const TeamCreate = () => {
  const navigate = useNavigate();
  // TODO : Submission event

  const submitData = async (data) => {
    try {
      console.log(data);
      let response = await teamSvc.createTeam(data);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/team");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          pageTitle={"Team Create"}
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
              title: "Team Create",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TeamFormComponent
              submitForm={submitData}
              defaultData={{
                title: "",
                image: null,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCreate;
