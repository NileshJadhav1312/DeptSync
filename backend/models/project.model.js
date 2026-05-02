const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    guideName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cclass: {
      type: String,
    },
    semester: {
      type: String,
    },
    abstract: {
      type: String,
    },
    fund: {
      type: String,
    },
    projectType: {
      type: String,
      enum: ["major", "mini", "research", "consultancy", "other"],
      required: true,
    },
    category: {
      type: String,
      enum: ["inhouse", "internship", "live", "sponsored", "other"],
      required: true,
    },
    supportingDocuments: {
      type: String, // Link or path to document
    },
    addDate: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "roleModel",
    },
    roleModel: {
      type: String,
      required: true,
      enum: ["Student", "Teacher"],
    },
    identificationNumber: {
      type: String,
      required: true,
    },
    isGroupProject: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        name: { type: String },
        identificationNumber: { type: String },
      },
    ],
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentName: {
      type: String,
    },
        approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    coordinatorComment: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);

