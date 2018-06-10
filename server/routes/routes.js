import PatientController from "../controllers/patientController";
import { login, signup } from "../controllers/userController";

export default app => {
  app.get("/api/patients", PatientController.create);
  app.post("/api/patients", PatientController.create);
  app.put("/api/patients", PatientController.edit);
  app.post("/api/login", login);
  app.post("/api/signup", signup);
};
