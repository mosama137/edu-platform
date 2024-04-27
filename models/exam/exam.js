// Define Exam Schema
const examSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    date: Date,
    // Other exam fields
});


const Exam = mongoose.model('Exam', examSchema);