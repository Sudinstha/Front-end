import { NavLink } from "react-router-dom";
const TeamsPage = () => {
  return (
    <>
      <div className="homepage">
        <div className="wrapper">
          <ul className="dynamic-txtss ">
            <li>
              <span>Welcome to Admin page</span>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div className="home-btn text-center">
        <NavLink to={"/admin/team"} className="mt-1 me-1 btn-login">
          Team
        </NavLink>
        <NavLink to={"/admin/employer"} className="mt-1 me-1 btn-register">
          Employer
        </NavLink>
      </div>
    </>
  );
};

export default TeamsPage;
