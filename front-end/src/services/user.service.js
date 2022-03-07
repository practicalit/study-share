import RestfulService from "./restful-api.service";

/**
 * Service for the study share related tasks.
 * @author Practical IT
 *
 */
class UserService {
  static register = async (user) => {
    const createdUser = await RestfulService.post(
      `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/auth/register`,
      user
    );
    if (createdUser) {
      UserService.saveTokens(createdUser);
      return createdUser;
    }
    return false;
  };

  static saveTokens = (response) => {
    localStorage.setItem("user", JSON.stringify(response?.data));
  };

  static login = async (user) => {
    try {
      const loggedUser = await RestfulService.post(
        `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/auth/login`,
        user
      );
      if (loggedUser) {
        UserService.saveTokens(loggedUser);
        return loggedUser;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };
}

export default UserService;
