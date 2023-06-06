import "../../assests/css/styles.css";
import "bootstrap";
import AdminTopNav from "./component/admin-top-nav.component";
import AdminFooter from "./component/admin-footer.component";
import { Outlet } from "react-router-dom";

const AdminPageLayout = () => {
  return (
    <>
      <AdminTopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
