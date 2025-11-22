import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ❌ Removed pre-save hashing hook (handled in controller now)
// Because password was being hashed twice (once in controller, once here)

const User = mongoose.model("User", userSchema);
export default User;
