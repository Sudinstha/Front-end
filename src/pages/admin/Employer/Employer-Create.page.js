import { toast } from "react-toastify";
import employerSvc from "../../../services/employer.service";
import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import EmployerFormComponent from "./employer-form.component";
import { useNavigate } from "react-router-dom";

const EmployerCreate = () => {
  const navigate = useNavigate();
  const submitData = async (data) => {
    try {
      data.team = data.team.value ?? null;
      let response = await employerSvc.createEmployer(data);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/employer");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          pageTitle={"Employer Create"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Employer List",
              link: "/admin/employer",
            },
            {
              title: "Employer Create",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <EmployerFormComponent
              submitForm={submitData}
              defaultData={{
                name: "",
                email: "",
                phone: "",
                address: "",
                team: "",
                image: null,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerCreate;
