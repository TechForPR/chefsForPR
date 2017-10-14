const mongoose = require('../config').mongoose;
const shortid = require('shortid');
const forms = require('forms');
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

Request.statics.createForm = function (labels) {
    const fields = forms.fields;
    // const validators = forms.validators;
    const widgets = forms.widgets;

    const reg_form = forms.create({
        name: fields.string({ required: true, label: labels.name }),
        agency: fields.string({ label: labels.agency }),
        email: fields.email({ label: labels.email }),
        phone: fields.tel({ label: labels.phone }),
        twitter: fields.string({ label: labels.twitter }),
        facebook: fields.string({ label: labels.facebook }),
        address: fields.string({ label: labels.address }),
        zipcode: fields.string({ label: labels.zipcode }),
        city: fields.string({ label: labels.city }),
        'questions.amountOfPeople': fields.number({ required: true, label: labels.amountOfPeople }),
        'questions.amountOfDays': fields.number({ label: labels.amountOfDays }),
        'questions.receivingFoodAlready': fields.boolean({ label: labels.receivingFoodAlready, widget: widgets.select(), choices: { 'true': 'Si / Yes', 'false': 'No'}}),
        'questions.receivingFoodAlreadyDetails': fields.string({ label: labels.receivingFoodAlreadyDetails, widget: widgets.textarea() }),
        'questions.currentlyHaveFoodFor': fields.number({ label: labels.currentlyHaveFoodFor }),
        'questions.currentlyHaveFoodForDetails': fields.string({ label: labels.currentlyHaveFoodForDetails, widget: widgets.textarea()  }),
        'needs.breakfast': fields.number({ required: true, label: labels.breakfast }),
        'needs.lunch': fields.number({ required: true, label: labels.lunch }),
        'needs.dinner': fields.number({ required: true, label: labels.dinner }),
        'needs.dietaryRestrictions': fields.string({ label: labels.dietaryRestrictions }),
        'needs.needBy': fields.date({ label: labels.needBy, widget: widgets.date(), }),
    });
    return reg_form;
}

module.exports = mongoose.model('Request', Request);
