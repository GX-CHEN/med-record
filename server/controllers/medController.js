import MedModel from "../models/medModel";

export default {
  // next help tell the actual error
  create(req, res, next) {
    console.log("inside create med with request body", req.body);
    const medProps = req.body;
    MedModel.create(medProps)
      .then(med => res.send(med))
      .catch(next);
  },

  delete(req, res, next) {
    console.log("inside delete med with request body", req.body);
    const medId = req.medId;
    MedModel.remove({ _id: medId })
      .then(med => res.send(med))
      .catch(next);
  }
};
