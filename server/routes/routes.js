import PatientController from "../controllers/patients_controller";
import {login, signup} from  "../controllers/user_controller";

module.exports = app => {
  app.post("/api/patients", PatientController.create);
  app.put("/api/patients", PatientController.edit);
  app.route("/login").post(login);
  app.route("/signup").post(signup);
};
