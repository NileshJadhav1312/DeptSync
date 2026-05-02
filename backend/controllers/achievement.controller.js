const Achievement = require("../models/achievement.model");

exports.createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    return res.status(201).json({ success: true, achievement });
  } catch (error) {
    console.error("Error creating achievement:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find()
      .populate("achievedBy")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!achievement) return res.status(404).json({ success: false, message: "Achievement not found" });
    return res.status(200).json({ success: true, achievement });
  } catch (error) {
    console.error("Error updating achievement:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ success: false, message: "Achievement not found" });
    return res.status(200).json({ success: true, message: "Achievement deleted" });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDepartmentAchievements = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { approvalStatus } = req.query;
    let query = { departmentId };
    if (approvalStatus) query.approvalStatus = approvalStatus;

    const achievements = await Achievement.find(query)
      .populate("achievedBy")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, achievements });
  } catch (error) {
    console.error("Error fetching department achievements:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.reviewAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) {
      return res.status(400).json({ success: false, message: "Invalid approval status." });
    }

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { approvalStatus, coordinatorComment, approvedBy },
      { new: true }
    );
    
    if (!achievement) return res.status(404).json({ success: false, message: "Achievement not found" });
    
    return res.status(200).json({ success: true, achievement });
  } catch (error) {
    console.error("Error reviewing achievement:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
