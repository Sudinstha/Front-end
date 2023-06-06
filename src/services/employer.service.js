import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class EmployerService extends HttpService {
  listAllEmployers = async (params) => {
    // TODO: List API call
    try {
      let response = await this.getRequest(
        ApiEndpoints.EMPLOYER + "?" + params,
        {
          login: true,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  // _ => protected
  // # => private
  #dataMapping = (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((name, index) => {
      if (name === "image") {
        if (typeof data["image"] === "object") {
          formData.append("image", data.image, data.image.name);
        }
      } else {
        formData.append(name, data[name]);
      }
    });
    return formData;
  };
  createEmployer = async (data) => {
    try {
      data = this.#dataMapping(data);
      let response = await this.postRequest(ApiEndpoints.EMPLOYER, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  deleteEmployer = async (id) => {
    try {
      let response = await this.deleteRequest(
        ApiEndpoints.EMPLOYER + "/" + id,
        {
          login: true,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  getEmployerById = async (id) => {
    try {
      let response = await this.getRequest(ApiEndpoints.EMPLOYER + "/" + id);
      return response;
    } catch (err) {
      throw err;
    }
  };
  updateEmployer = async (data, id) => {
    try {
      data = this.#dataMapping(data);
      let response = await this.patchRequest(
        ApiEndpoints.EMPLOYER + "/" + id,
        data,
        { login: true, files: true }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  getEmployerBySlug = async (slug) => {
    try {
      let response = await this.getRequest(ApiEndpoints.EMPLOYER + "/" + slug);
      return response;
    } catch (err) {
      throw err;
    }
  };
  getEmployerForHomePage = async () => {
    try {
      let response = await this.getRequest(
        ApiEndpoints.EMPLOYER + "/active/list"
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
const employerSvc = new EmployerService();
export default employerSvc;
