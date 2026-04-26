const ActivityDetails = require("../models/activityDetails.model");

exports.createActivity = async (req, res) => {
  try {
    const activity = new ActivityDetails(req.body);
    await activity.save();
    return res.status(201).json({ success: true, activity });
  } catch (error) {
    console.error("Error creating activity:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "Validation Error", details: error.errors });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const { departmentId } = req.query;
    const filter = {};
    if (departmentId && departmentId !== "null" && departmentId !== "undefined") {
      filter.departmentId = departmentId;
    }
    const activities = await ActivityDetails.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const activity = await ActivityDetails.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });
    return res.status(200).json({ success: true, activity });
  } catch (error) {
    console.error("Error updating activity:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await ActivityDetails.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });
    return res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
