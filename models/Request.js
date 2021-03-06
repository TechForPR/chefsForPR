const mongoose = require('../config').mongoose;
const shortid = require('shortid');
const forms = require('forms');
const requestStatuses = require('../config/constants').requestStatuses;
const longDateFormat = require('../config/constants').longDateFormat;
const moment = require('moment');

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
    language: {
        type: String,
        enum: ['english', 'spanish'],
    },
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
    address: {
        type: String,
        required: [true, 'Address is required for delivery'],
    },
    city: {
        type: String,
        required: [true, 'Tell us what city to deliver the food to'],
    },
    zipcode: {
        type: String,
        required: [true, 'Tell us which Zipcode to deliver the food'],
    },
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
    },
    needs: {
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

Request.statics.createForm = function (labels, language) {
    const fields = forms.fields;
    // const validators = forms.validators;
    const widgets = forms.widgets;

    const reg_form = forms.create({
        language: fields.string({required: true, widget: widgets.hidden(), value: language}),
        name: fields.string({ required: true, label: labels.name }),
        agency: fields.string({ label: labels.agency }),
        email: fields.email({ label: labels.email }),
        phone: fields.tel({ label: labels.phone }),
        address: fields.string({ label: labels.address }),
        zipcode: fields.string({ label: labels.zipcode }),
        city: fields.string({ label: labels.city }),
        'questions.amountOfPeople': fields.number({ required: true, label: labels.amountOfPeople }),
        // 'questions.amountOfDays': fields.number({ label: labels.amountOfDays }),
        'questions.receivingFoodAlready': fields.boolean({ label: labels.receivingFoodAlready, widget: widgets.select(), choices: { 'true': 'Si / Yes', 'false': 'No'}}),
        'questions.receivingFoodAlreadyDetails': fields.string({ label: labels.receivingFoodAlreadyDetails, widget: widgets.textarea() }),
        'needs.dietaryRestrictions': fields.string({ label: labels.dietaryRestrictions }),
        'needs.needBy': fields.date({ label: labels.needBy, widget: widgets.date(), }),
    });
    return reg_form;
}
Request.virtual('requestedOn').get(function () {
    return moment(this.createdAt).format(longDateFormat);
});

module.exports = mongoose.model('Request', Request);
