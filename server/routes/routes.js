const PatientController = require('../controllers/patients_controller')

module.exports = (app) => {
    app.post('/api/patients', PatientController.create);
    app.put('/api/patients', PatientController.edit);
}