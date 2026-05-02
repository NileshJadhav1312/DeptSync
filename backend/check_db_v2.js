const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/project.model');
const Consultancy = require('./models/consultancy.model');
const JournalPublication = require('./models/journalPublication.model');

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("\n--- Projects ---");
        const projects = await Project.find({}).limit(1);
        if (projects.length > 0) {
            console.log("userId type:", typeof projects[0].userId, projects[0].userId.constructor.name);
            console.log(JSON.stringify(projects, null, 2));
        }

        console.log("\n--- Consultancies ---");
        const consultancies = await Consultancy.find({}).limit(1);
        if (consultancies.length > 0) {
            console.log("createdById type:", typeof consultancies[0].createdById, consultancies[0].createdById.constructor.name);
            console.log(JSON.stringify(consultancies, null, 2));
        }

        console.log("\n--- Journal Publications ---");
        const journals = await JournalPublication.find({}).limit(5);
        console.log(JSON.stringify(journals, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkData();
