import AdminBreadCrumb from "../component/admin-breascrumnb.component";
import TeamListGridComponent from "../../home/team-list-grid.component";

const TeamList = () => {
  return (
    <>
      <div className="container mt-4 px-4">
        <AdminBreadCrumb
          showAdd={true}
          btnLink="/admin/team/create"
          pageTitle={"Team"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Team List",
              link: null,
            },
          ]}
        />

        <TeamListGridComponent />
      </div>
    </>
  );
};

export default TeamList;
