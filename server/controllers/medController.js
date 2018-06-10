import MedModel from "../models/medModel";

export default {
  create(req, res, next) {
    const medProps = req.body;
    MedModel.create(medProps)
      .then(() => {
        MedModel.find().then(meds => {
          res.send({ medList: meds });
        });
      })
      .catch(next);
  },

  list(req, res, next) {
    MedModel.find()
      .then(meds => {
        res.send({ medList: meds });
      })
      .catch(next);
  },

  delete(req, res, next) {
    console.log("inside delete med with request body", req.body);
    const medId = req.body.medId;
    MedModel.remove({ _id: medId })
      .then(() => {
        MedModel.find().then(meds => {
          res.send({ medList: meds });
        });
      })
      .catch(next);
  }
};
