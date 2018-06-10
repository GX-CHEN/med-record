import bcrypt from "bcrypt";
import mongoose from "mongoose";

/**
 * User is for both doctors and patients
 * Beside the login info, we have a boolean value @member doctor_role to decide if the user is doctor or patient
 * The doctor_role boolean value can only set by admin manually in DB
 * schedules will be a list of ids refer to specific schedule (notice each schedule contains nested scheduleItems)
 */
var UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    doctor_role: { type: Boolean, default: false },
    med_ids: { type: Array, default: [] },
    schedule_ids: { type: Array, default: [] }
  },
  { timestamps: true }
);

/**
 * hashing a password before saving it to the database
 */

UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

export { UserSchema };
export default mongoose.model("User", UserSchema);
