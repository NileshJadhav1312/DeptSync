const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: true,
      trim: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    semester: {
      type: String, // or Number if you prefer (1,2,3...)
      required: true,
    },

    keyFocusedAreas: {
      type: String,
    },

    targetAudience: {
      type: String,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    numberOfParticipants: {
      type: Number,
      default: 0,
    },

    fundsInRupees: {
      type: Number,
      default: 0,
    },

    fundSourceName: {
      type: String,
    },

    coordinators: [
      {
        type: String, // or ObjectId if linked to Teacher
      },
    ],

    resourcePersons: [
      {
        type: String,
      },
    ],

    certifyingInstitute: {
      type: String,
    },

    activityType: {
      type: String,
      enum: [
        "Guest Lecture",
        "Workshop",
        "Seminar",
        "Session",
        "Webinar",
        "Training Session",
        "FDP",
        "STTP",
        "Conference",
        "Project Exhibition",
        "Competition",
        "Other",
      ],
      required: true,
    },

    otherActivityType: {
      type: String,
    },

    participationType: {
      type: String,
      enum: ["Organised", "Attended"],
      required: true,
    },

    activityMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },

    durationInDays: {
      type: Number,
    },

    // Reference to separate Document table
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],

    activityLevel: {
      type: String,
      enum: [
        "International",
        "National",
        "State",
        "University",
        "Institute",
        "Department",
        "Departmental"
      ],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Auto-update updatedAt
activitySchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("ActivityDetails", activitySchema);
