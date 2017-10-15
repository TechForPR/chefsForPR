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
    districtName: {
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
    },
    demandSuplyGap: {
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
        districtName: fields.string({ label: labels.districtName }),
        lastDayOfDelivery: fields.date({ label: labels.lastDayOfDelivery, widget: widgets.date() }),
        numberOfMealsDelivered: fields.number({ label: labels.numberOfMealsDelivered }),
        demandSuplyGap: fields.string({ label: labels.demandSuplyGap }),
    });
    return reg_form;
}

Delivery.virtual('createdOn').get(function () {
    return moment(this.createdAt).format(longDateFormat);
});

module.exports = mongoose.model('Delivery', Delivery);
