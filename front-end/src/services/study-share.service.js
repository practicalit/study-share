import RestfulService from "./restful-api.service";

/**
 * Service for the study share related tasks.
 * @author Practical IT
 *
 */
class StudyShareService {
  static createMaterial = () => {
    RestfulService.post("localhost:3002/v1/study-materials", {
      title: "Intro to nodejs",
      link: "https://www.w3schools.com/nodejs/nodejs_intro.asp",
      source: "w3schools",
    });
  };

  static getMaterials = async () => {
    const list = await RestfulService.get(
      `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/study-materials`
    );
    return list;
  };
}

export default StudyShareService;
