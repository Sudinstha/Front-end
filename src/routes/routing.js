import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/app";
import LoginPage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import ErrorPage from "../pages/error/error.page";
import HomePageLayout from "../pages/home/home.layout";
import AdminPageLayout from "../pages/admin/admin.layout";
import TeamsPage from "../pages/admin/Dashboard/team.page";
import PrivateRoutes from "./private.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployerList from "../pages/admin/Employer/employer-list.page";
import EmployerEdit from "../pages/admin/Employer/employer-edit.component";
import TeamCreate from "../pages/admin/teams/team-create.page";
import TeamEdit from "../pages/admin/teams/team-edit.component";
import TeamList from "../pages/admin/teams/team-list.page";
import { Provider } from "react-redux";
import store from "../store";
import EmployerCreate from "../pages/admin/Employer/Employer-Create.page";
import TeamEmployerList from "../pages/admin/Employer/team-employer-list.page";
import EmployerDetailPage from "../pages/admin/Employer/employer-detail.page";

const Routing = () => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>

            <Route
              path="/admin"
              element={
                <PrivateRoutes toCheck="admin">
                  <AdminPageLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<TeamsPage />} />
              <Route path="team" element={<TeamList />} />
              <Route path="team/:teamSlug" element={<TeamEmployerList />} />
              <Route path="team/create" element={<TeamCreate />} />
              <Route path="team/edit/:id" element={<TeamEdit />} />
              <Route path="employer" element={<EmployerList />} />
              <Route path="employer/:slug" element={<EmployerDetailPage />} />
              <Route path="employer/create" element={<EmployerCreate />} />
              <Route path="employer/edit/:id" element={<EmployerEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Routing;
