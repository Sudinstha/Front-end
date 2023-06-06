import { toast } from "react-toastify";
import employerSvc from "../../../services/employer.service";
import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import EmployerFormComponent from "./employer-form.component";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const EmployerEdit = () => {
  let params = useParams();
  let [detail, setDetails] = useState();
  let [employerId, setEmployerId] = useState();
  const navigate = useNavigate();
  const submitData = async (data) => {
    try {
      data.team = data.team.value ?? null;
      let response = await employerSvc.updateEmployer(data, employerId);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/employer");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };
  const getEmployerBySlug = useCallback(async () => {
    try {
      let data = await employerSvc.getEmployerBySlug(params.id);

      setDetails({
        name: data.result.name,
        email: data.result.email,
        phone: data.result.phone,
        address: data.result.address,
        team: data.result.team
          ? { label: data.result.team.title, value: data.result.team._id }
          : "",
        image: data.result.image,
      });
      setEmployerId(data.result._id);
    } catch (err) {
      console.error(err);
    }
  }, [params.id]);
  useEffect(() => {
    getEmployerBySlug();
  }, [getEmployerBySlug]);
  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          pageTitle={"Employer Update"}
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
              title: "Employer Edit",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <EmployerFormComponent
              submitForm={submitData}
              defaultData={detail}
              create={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployerEdit;
