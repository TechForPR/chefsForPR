const mongoose = require('../config').mongoose;
const shortid = require('shortid');
const forms = require('forms');
const deliveryStatuses = require('../config/constants').deliveryStatuses;
const longDateFormat = require('../config/constants').longDateFormat;
const moment = require('moment');

const formatDate = function (d) {
    moment(d).format(longDateFormat);
};

const Schema = mongoose.Schema;

const Delivery = new Schema({
    shortId: {
        type: String,
        'default': shortid.generate,
    },
    agency: {
        type: String,
        required: [true, 'This field is required'],
    },
    districtName: {
        type: String,
        required: [true, 'This field is required'],
    },
    municipality: {
        type: String,
        required: [true, 'This field is required'],
    },
    lastDayOfDelivery: {
        type: Date,
        get: formatDate,
        required: [true, 'Last Day Of Delivery is required'],
    },
    numberOfMealsDelivered: {
        type: Number,
        required: [true, 'Last Day Of Delivery is required'],
    },
    demandSuplyGap: {
        type: String,
    },
    requestNumber: {
        type: String,
    },
    status: {
        type: String,
        enum: deliveryStatuses,
        default: deliveryStatuses[0],
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

Delivery.statics.createForm = function (labels) {
    const fields = forms.fields;
    const widgets = forms.widgets;
    const reg_form = forms.create({
        agency: fields.number({ label: labels.agency }),
        municipality: fields.string({ label: labels.municipality }),
        districtName: fields.string({ label: labels.districtName }),
        lastDayOfDelivery: fields.date({ label: labels.lastDayOfDelivery, widget: widgets.date() }),
        numberOfMealsDelivered: fields.number({ label: labels.numberOfMealsDelivered }),
        requestNumber: fields.string({ label: labels.requestNumber }),
    });
    return reg_form;
}

Delivery.virtual('createdOn').get(function () {
    return moment(this.createdAt).format(longDateFormat);
});

Delivery.virtual('lastDayOfDeliveryParsed').get(function () {
    return moment(this.lastDayOfDelivery).format(longDateFormat);
});

module.exports = mongoose.model('Delivery', Delivery);
