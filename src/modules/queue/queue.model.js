import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const QueueSchema = new Schema ({
    Context: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    NotificationTemplateId: {
        type: String
    },
    Subject: {
        type: String
    },
    Message: {
        type: String
    },
    Status: {
        type: String
    },
    DeliveryDate: {
        type: Date
    },
    Tries: {
        type: {}
    }
});

export default mongoose.model('Queue', QueueSchema);