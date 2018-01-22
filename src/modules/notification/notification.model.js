import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const NotificationSchema = new Schema ({
    RecipientId: {
        type: String,
        required: [true, 'Recipient is required']
    },
    Context: {
        type: String
    },
    NotificationTemplateId: {
        type: String,
        required: [true, 'Notification Template is required']
    },
    Payload: {
        type: {}
    },
    DeliveryDate: {
        type: Date
    },
    Status: {
        type: String
    },
    DateCreated: {
        type: Date,
        defualt: new Date()
    },
    CreatedBy: {
        type: String
    },
    UpdatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    }
});

export default mongoose.model('Notification', NotificationSchema);