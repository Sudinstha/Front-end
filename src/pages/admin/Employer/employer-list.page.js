import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import TableComponent from "../../../component/tabel/table.component";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import employerSvc from "../../../services/employer.service";
import { Badge } from "react-bootstrap";
import TableActionButtons from "../../../component/tabel/tabel-action-button.component";
import { NavLink } from "react-router-dom";

const EmployerList = () => {
  const handleEmployerDelete = async (id) => {
    try {
      let response = await employerSvc.deleteEmployer(id);
      if (response.status) {
        toast.success(response.msg);
      }
    } catch (error) {
      console.log(error);
      toast.warning("Error deleting employer");
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) => (
        <NavLink to={"/admin/employer/" + row.slug}>open</NavLink>
      ),
      sortable: true,
    },
    {
      name: "Team",
      selector: (row) => <Badge bg={"success"}>{row.team.slug}</Badge>,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <TableActionButtons
            deleteAction={handleEmployerDelete}
            id={row._id}
            editUrl={"/admin/employer/edit/" + row.slug}
          />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  let [loading, setLoading] = useState(true);

  const loadAllEmployers = useCallback(async () => {
    try {
      let response = await employerSvc.listAllEmployers();
      setData(response.result);
    } catch (err) {
      console.log(err);
      toast.warn(err.msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllEmployers();
  }, [loadAllEmployers]);

  return (
    <>
      <div className="container-fluid px-4 my-4">
        <AdminBreadCrumb
          showAdd={true}
          btnLink="/admin/employer/create"
          pageTitle={"Employer"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Employer List",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TableComponent
              columns={columns}
              data={data}
              apiCaller={loadAllEmployers}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerList;
