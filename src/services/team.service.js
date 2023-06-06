import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class TeamService extends HttpService {
  listAllTeams = async (params = null) => {
    // TODO: List API call
    try {
      let response = await this.getRequest(ApiEndpoints.TEAM + "?" + params, {
        login: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  // _ => protected
  // # => private
  #dataMapping = (data) => {
    console.log(data);
    let formData = new FormData();
    Object.keys(data).forEach((name, index) => {
      if (name === "image") {
        formData.append("image", data.image, data.image.name);
      } else {
        formData.append(name, data[name]);
      }
    });
    return formData;
  };
  createTeam = async (data) => {
    try {
      data = this.#dataMapping(data);
      let response = await this.postRequest(ApiEndpoints.TEAM, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  deleteTeam = async (id) => {
    try {
      let response = await this.deleteRequest(ApiEndpoints.TEAM + "/" + id, {
        login: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  getTeamById = async (id) => {
    try {
      let response = await this.getRequest(ApiEndpoints.TEAM + "/" + id, {
        login: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  getTeamBySlug = async (slug) => {
    try {
      let response = await this.getRequest(
        ApiEndpoints.TEAM + "/by-slug/" + slug,
        {
          login: true,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  updateTeam = async (data, id) => {
    try {
      data = this.#dataMapping(data);
      let response = await this.patchRequest(
        ApiEndpoints.TEAM + "/" + id,
        data,
        { login: true, files: true }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  getTeamForHomePage = async () => {
    try {
      let response = await this.getRequest(ApiEndpoints.TEAM + "/active/list");
      return response;
    } catch (err) {
      throw err;
    }
  };
  getEmployerByTeamSlug = async (slug) => {
    try {
      let response = await this.getRequest(
        ApiEndpoints.TEAM + "/by-slug/" + slug
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
const teamSvc = new TeamService();
export default teamSvc;
