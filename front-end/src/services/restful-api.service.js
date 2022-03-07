/**
 * Service for the restful services.
 * @author Practical IT
 *
 */
import axios from "axios";

class RestfulService {
  static async get(url, options) {
    try {
      const response = await axios.get(url, options);
      return response;
    } catch (e) {
      // what is the best way to handle this?
      console.log(e);
    }
    return false;
  }

  static post = async (url, data, options) => {
    try {
      const response = await axios.post(url, data, options);
      return response;
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  static put = async (url, data, options) => {
    try {
      const response = await axios.post(url, data, options);
      return response;
    } catch (e) {
      console.log(e);
    }
    return false;
  };
}

export default RestfulService;
