import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const NotificationTemplateSchema = new Schema ({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [6, 'minimum length is 6'],
        unique: true
    },
    Description: {
        type: String
    },
    Context: {
        type: String
    },
    MessageTemplateId: {
        type: String,
        required: [true, 'Message Template Id is required']
    },
    Channel: {
        type: String,
        required: [true, 'Channel is required']
    },
    Service: {
        type: String,
        required: [true, 'Service required']
    },
    Port: {
        type: Number
    },
    Sender: {
        type: String,
        required: [true, 'Sender is required']
    },
    AccountId: {
        type: String,
        required: [true, 'AccountId is required']
    },
    AccountToken: {
        type: String,
        required: [true, 'AccountToken is required']
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
});

export default mongoose.model('NotificationTemplate', NotificationTemplateSchema);