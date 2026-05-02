const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/activities", require("./routes/activityDetails.routes"));
app.use("/api/achievements", require("./routes/achievement.routes"));
app.use("/api/classrooms", require("./routes/classroom.routes"));

// New Research & Professional Activity Routes
app.use("/api/book-publications", require("./routes/bookPublication.routes"));
app.use("/api/committees", require("./routes/committee.routes"));
app.use("/api/grants", require("./routes/grant.routes"));
app.use("/api/editorial-boards", require("./routes/editorialBoard.routes"));
app.use("/api/consultancies", require("./routes/consultancy.routes"));
app.use("/api/journal-publications", require("./routes/journalPublication.routes"));
app.use("/api/conference-publications", require("./routes/conferencePublication.routes"));
app.use("/api/book-chapters", require("./routes/bookChapter.routes"));
app.use("/api/patents", require("./routes/patent.routes"));
app.use("/api/copyrights", require("./routes/copyright.routes"));
app.use("/api/projects", require("./routes/project.routes"));

app.use("/api", require("./routes/testRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
