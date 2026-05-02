const mongoose = require('mongoose');
require('dotenv').config();
const Consultancy = require('./models/consultancy.model');

async function checkCons() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const cons = await Consultancy.find({ 
            $or: [
                { studentId: "69ec6c874d0135edc143ab29" },
                { createdById: "69ec6c874d0135edc143ab29" }
            ]
        });
        console.log("Count:", cons.length);
        console.log(JSON.stringify(cons, null, 2));
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}
checkCons();
