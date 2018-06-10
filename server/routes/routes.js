import PatientController from "../controllers/patientController";
import MedController from "../controllers/medController";
import { login, signup } from "../controllers/userController";

export default app => {
  app.get("/api/patients", PatientController.create);
  app.post("/api/patients", PatientController.create);
  app.put("/api/patients", PatientController.edit);

  app.get("/api/med/list", MedController.list);
  app.post("/api/med/add", MedController.create);
  app.put("/api/med/delete", MedController.delete);

  app.post("/api/login", login);
  app.post("/api/signup", signup);
};
