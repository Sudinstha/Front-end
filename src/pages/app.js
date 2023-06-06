import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="homepage">
        <div className="wrapper">
          <ul className="dynamic-txts">
            <li>
              <span>Hello</span>
            </li>
            <li>
              <span>Namaste</span>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div className="static-txt">Welcome to Home Page</div>
      <div className="home-btn">
        <NavLink to={"login"} className="mt-1 me-1 btn-login">
          Login
        </NavLink>
        <NavLink to={"register"} className="mt-1 me-1 btn-register">
          Register
        </NavLink>
      </div>
    </>
  );
}

export default HomePage;
