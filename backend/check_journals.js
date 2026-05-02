const mongoose = require('mongoose');
require('dotenv').config();
const Journal = require('./models/journalPublication.model');

async function checkJournals() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const js = await Journal.find({ 
            $or: [
                { studentId: "69ec6c874d0135edc143ab29" },
                { createdById: "69ec6c874d0135edc143ab29" }
            ]
        });
        console.log("Count:", js.length);
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}
checkJournals();
