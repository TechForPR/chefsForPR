const mongoose = require('../config').mongoose;
const shortid = require('shortid');
const requestStatuses = require('../config/constants').requestStatuses;

// Taken from this answer: https://stackoverflow.com/questions/22732836/mongoose-conditional-required-validation
// Either phone number or email are required so the volunteers can verify the requests
const conditionalRequire = {
    validator: function () {
        return (this.email && this.email !== null) || (this.phone && this.phone !== null);
    },
    msg: 'Email or Phone Number are required',
};

const Schema = mongoose.Schema;

const Request = new Schema({
    shortId: {
        type: String,
        'default': shortid.generate,
    },
    name: {
        type: String,
        required: [true, 'Name of the requester is required'],
    },
    agency: String,
    email: {
        type: String,
        validate: conditionalRequire,
    },
    phone: {
        type: String,
        validate: conditionalRequire,
    },
    twitter: String,
    facebook: String,
    address: {
        type: String,
        required: [true, 'Address is required for delivery'],
    },
    zipcode: String,
    questions: {
        amountOfPeople: {
            type: Number,
            required: [true, 'Tell us how many people need meals in your location'],
        },
        amountOfDays: {
            type: Number,
        },
        receivingFoodAlready: Boolean,
        receivingFoodAlreadyDetails: String,
        currentlyHaveFoodFor: Number,
        currentlyHaveFoodForDetails: String,
    },
    needs: {
        breakfast: {
            type: Number,
            required: [true, 'Tell us how many breakfasts you need'],
        },
        lunch: {
            type: Number,
            required: [true, 'Tell us how many lunches you need'],
        },
        dinner: {
            type: Number,
            required: [true, 'Tell us how many dinners you need'],
        },
        dietaryRestrictions: String,
        needBy: Date,
    },
    status: {
        type: String,
        enum: requestStatuses,
        default: requestStatuses[0],
    },
    hidden: {
        type: Boolean,
        default: false,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

module.exports = mongoose.model('Request', Request);
