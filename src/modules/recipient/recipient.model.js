import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const RecipientSchema = new Schema ({
    UserId: {
        type: String
    },
    Name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    Context: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    Createdby: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
});

export default mongoose.model('Recipient', RecipientSchema);