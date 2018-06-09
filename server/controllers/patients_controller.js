import Patient from "../models/patient";

module.exports = {
  // next help tell the actual error
  create(req, res, next) {
    console.log("inside create with request body", req.body);
    const patientProps = req.body;
    Patient.create(patientProps)
      .then(patient => res.send(patient))
      .catch(next);
  },

  edit(req, res, next) {
    // get the id subject from the url call
    console.log(req.body);
    const patientProps = req.body;

    const b = patientProps.bangou;
    const t = patientProps.time;

    // patient is the stuff returned from find
    Patient.findOneAndUpdate({ bangou: b }, { $push: { time: t } })
      .then(() => Patient.findOne({ bangou: b }))
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
