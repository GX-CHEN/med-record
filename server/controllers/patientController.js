import PatientReportModel from "../models/patientReportModel";

/**
 * This controller handles the patient reporting for their medicine intake time
 */
export default {
  // next help tell the actual error
  create(req, res, next) {
    console.log("inside create with request body", req.body);
    const patientProps = req.body;
    PatientReportModel.create(patientProps)
      .then(patient => res.send(patient))
      .catch(next);
  },

  edit(req, res, next) {
    // get the id subject from the url call
    const patientProps = req.body;

    const b = patientProps.patient_id;
    const t = patientProps.time;

    // patientReport is the stuff returned from find
    PatientReportModel.findOneAndUpdate({ patient_id: b }, { $push: { time: t } })
      .then(() => PatientReportModel.findOne({ patient_id: b }))
      // get resp from the previous return
      .then(resp => {
        if (resp == null) {
          reply = JSON.stringify("ID not found!");
        } else {
          reply = resp;
        }
        res.send(reply);
      })
      .catch(next);
  }
};
