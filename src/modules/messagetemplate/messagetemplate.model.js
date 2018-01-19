import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const MessageTemplateSchema = new Schema({
    Name: {
       type: String,
       required: [true, 'Name is required'],
       unique: true,
       minLength: [6, 'Message template name minimum length is 6']
    },
    Context: {
      type: String  
    },
    Description: {
        type: String
    },
    Subject: {
        type: String
    },
    Message: {
        type: String,
        required: [true, 'Message is required']
    },
    ContentType: {
        type: String
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

export default mongoose.model('MessageTemplate', MessageTemplateSchema);