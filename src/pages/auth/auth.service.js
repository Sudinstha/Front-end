import ApiEndpoints from "../../config/api-endpoints";
import AppConstants from "../../config/constant";
import HttpService from "../../services/http.service";

class AuthService extends HttpService {
  login = async (data) => {
    try {
      let loginResponse = await this.postRequest(ApiEndpoints.LOGIN, data);
      console.log("loginRe", loginResponse);
      localStorage.setItem(
        AppConstants.AUTH_KEY,
        loginResponse.result.accessToken
      );
      let user = {
        id: loginResponse.result.userDetail._id,
        name: loginResponse.result.userDetail.name,
        email: loginResponse.result.userDetail.email,
        image: loginResponse.result.userDetail?.image?.[0],
        role: loginResponse.result.userDetail.role,
      };
      localStorage.setItem(AppConstants.AUTH_USER_KEY, JSON.stringify(user));
      return loginResponse.result;
    } catch (err) {
      console.log("LoginErr", err);
      throw err;
    }
  };

  getLoggedInUser = async () => {
    try {
      let response = await this.getRequest(ApiEndpoints.LOGGEDINUSER, {
        login: true,
      });
      return response;
    } catch (error) {
      console.log("GetLoggedInError: ", error);
      throw error;
    }
  };

  register = async (data) => {
    try {
      let response = await this.postRequest(ApiEndpoints.REGISTER, data);
      return response;
    } catch (err) {
      console.log("RegisterErr: ", err);
      throw err;
    }
  };
  updatePassword = async (data) => {
    try {
      let response = await this.postRequest(ApiEndpoints.PWD_CHANGE, data, {
        login: true,
      });
      return response;
    } catch (err) {
      console.log("Error changing password", err);
      throw err;
    }
  };
}

const authSvc = new AuthService();
export default authSvc;
