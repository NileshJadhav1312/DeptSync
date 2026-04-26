const mongoose = require("mongoose");
const crypto = require("crypto");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  classroomCode: {
    type: String,
    unique: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  classTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  pendingStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

classroomSchema.pre("save", async function () {
  this.updatedAt = Date.now();
  if (!this.classroomCode) {
    this.classroomCode = crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g., 6-character hex code
  }
});

module.exports = mongoose.model("Classroom", classroomSchema);
