const mongoose = require("mongoose");
const crypto = require("crypto");
// Define a sub-schema embedded for teachers within the department
const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    name: String,
  },
  { _id: false },
);

const departmentSchema = new mongoose.Schema({
  // Random, human-friendly unique id (e.g., 8 uppercase letters/digits)
  departmentUid: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  departmentName: {
    type: String,
    required: true,
    trim: true,
  },

  collegeName: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  createdByName: String,

  teachers: [teacherSchema],

  totalTeachers: {
    type: Number,
    default: 0,
  },

  description: String,

  hod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

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

// Generate an 8-character uppercase ID (A-Z, 0-9)
function generateDepartmentUid() {
  // 5 bytes -> 10 hex chars; map to base36 and take 8 chars
  return crypto.randomBytes(5).toString("base64url").replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 8);
}

// Ensure unique departmentUid before validation
departmentSchema.pre("validate", async function () {
  if (this.departmentUid) return;

  let attempts = 0;
  while (attempts < 5) {
    const candidate = generateDepartmentUid();
    // Check uniqueness
    const exists = await this.constructor.exists({ departmentUid: candidate });
    if (!exists) {
      this.departmentUid = candidate;
      return;
    }
    attempts += 1;
  }
  throw new Error("Could not generate a unique department ID. Please retry.");
});

departmentSchema.pre("save", function () {
  this.updatedAt = Date.now();
});


module.exports = mongoose.model("Department", departmentSchema);

