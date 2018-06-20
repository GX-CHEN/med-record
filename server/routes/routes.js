import PatientController from "../controllers/patientController";
import MedController from "../controllers/medController";
import MedHistoryController from "../controllers/medHistoryController";
import { login, signup } from "../controllers/userController";

export default app => {
  app.put("/api/timeReport", PatientController.addTimeRecord);
  app.put("/api/ifAlreadyReported", PatientController.checkIfAlreadyReported);

  app.get("/api/med/list", MedController.list);
  app.post("/api/med/add", MedController.create);
  app.put("/api/med/delete", MedController.delete);

  app.post("/api/login", login);
  app.post("/api/signup", signup);

  app.post("/api/listMedHistory", MedHistoryController.list);
};
