import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Fire Safety Certificate', 'Ground Safety Certificate', 'Building Safety Certificate', 'Sanitation Certificate', 'Other'],
        default: 'Other'
    },
    link: {
        type: String,
        required: [true, 'Google Drive link is required']
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
