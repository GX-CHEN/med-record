const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    bangou: {
        type: String,
        required: true
    },
    time: {
        type: [String]
        // with required = true, the array need
        // at least 1 element. Without, send nothing
        //and it will be empty
    }
});

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;