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
        "Webinar",
        "Training Session",
        "FDP",
        "STTP",
        "Other",
      ],
      required: true,
    },

    activityMode: {
      type: String,
      enum: ["Organised", "Attended"],
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
      ],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
