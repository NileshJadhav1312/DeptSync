const mongoose = require('mongoose');
require('dotenv').config();
const Student = require('./models/student.model');

async function checkStudent() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const student = await Student.findOne({ firstName: "Vikas" });
        console.log(JSON.stringify(student, null, 2));
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}
checkStudent();
