const mongoose = require("mongoose");

const bookPublicationSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    subtitle: {
      type: String,
      trim: true
    },

    description: {
      type: String
    },

    // Authors
    authors: [
      {
        name: { type: String, required: true },
        affiliation: { type: String }, // optional
      }
    ],

    // Publication Details
    publicationDate: {
      type: Date,
      required: true
    },

    publisher: {
      name: { type: String, required: true },
      location: { type: String },
      website: { type: String }
    },

    edition: {
      type: String
    },

    language: {
      type: String,
      default: "English"
    },

    // Identification Numbers
    isbn: {
      type: String,
      unique: true,
      sparse: true
    },

    issn: {
      type: String,
      sparse: true
    },

    // Categorization
    subjects: [
      {
        type: String,
        index: true
      }
    ],

    bookArea: {
      type: String,
      enum: [
        "Academic",
        "Research",
        "Education",
        "Technology",
        "Health",
        "Business",
        "Social",
        "Fiction",
        "Non-Fiction",
        "Other"
      ],
      default: "Other"
    },

    level: {
      type: String,
      enum: ["International", "National", "State", "Local"],
      default: "National"
    },

    // Files
    coverImage: {
      url: { type: String },
      publicId: { type: String } 
    },

    pdfFile: {
      url: { type: String },
      publicId: { type: String }
    },

    price: {
      type: Number,
      min: 0
    },

    tags: [String],
    keywords: [String], 

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    reviewsCount: {
      type: Number,
      default: 0
    },

    // SEO / Links
    googleBooksLink: String,
    researchGateLink: String,

    // Teacher & Department Info (Required by user)
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },
    teacherName: {
      type: String,
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    departmentName: {
      type: String,
      required: true
    },

    // System Fields
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true 
  }
);

// Text index for search
bookPublicationSchema.index({
  title: "text",
  "authors.name": "text",
  subjects: "text",
  keywords: "text"
});

module.exports = mongoose.model("BookPublication", bookPublicationSchema);