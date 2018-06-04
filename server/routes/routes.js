import PatientController from "../controllers/patients_controller";
import {login, signup} from  "../controllers/user_controller";

module.exports = app => {
  app.get("/api/patients", PatientController.create);
  app.post("/api/patients", PatientController.create);
  app.put("/api/patients", PatientController.edit);
  app.post("/api/login", login);
  app.post("/api/signup", signup);
};
