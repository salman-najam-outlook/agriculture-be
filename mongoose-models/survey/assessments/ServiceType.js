const mongoose = require("mongoose");

const ServiceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    orgId: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Number,
        required: true
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const ServiceType = mongoose.model("ServiceType", ServiceTypeSchema);
module.exports = ServiceType;