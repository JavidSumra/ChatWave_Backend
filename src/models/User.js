"use strict";
module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      mobileNO: {
        type: String,
        required: true,
        unique: true,
      },
      userRole: {
        type: String,
        default: "Chatter",
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const User = mongoose.models.User || mongoose.model("User", newSchema);
  return User;
};
