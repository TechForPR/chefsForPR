const Request = require('../models/Request');
const Delivery = require('../models/Delivery');
const assert = require('assert');

const validRequest = {
    name: 'David Silva',
    agency: 'Tech For PR',
    email: 'techforpr@example.com',
    phone: 'xxx-xxx-xxxx',
    address: '123 fake st, apt 2',
    zipcode: '11001',
    city: 'Arecibo',
    questions: {
        amountOfPeople: 10,
    },
    needs: {
        breakfast: 10,
        lunch: 10,
        dinner: 10,
    },
};

const validDelivery = {
    districtName: 'Colaboratorio 15',
    lastDayOfDelivery: new Date('2017-10-25'),
    numberOfMealsDelivered: 100,
    demandSuplyGap: '100 missing',
    agency: 'Red Cross',
    municipalityId: '00201',
    city: 'Arecibo'
};

describe('Food Request Model', function () {
    it('Has no validation errors when given the proper info', function () {
        const request = new Request(validRequest);
        request.validateSync();
    });

    it('Gives errors when creating a Request with missing info', function () {
        const request = new Request(Object.assign({}, validRequest, { name: undefined }));
        const error = request.validateSync();
        assert(error.errors['name'].message);
    });

    it('Creates a Food Request if valid', function () {
        const request = new Request(validRequest);
        return request.save().then(function () {
        }).catch((err) => {
            assert.fail(err);
        });
    });

    it('Fails to create a Food Request if validator fails', function () {
        const request = new Request(Object.assign({}, validRequest, { name: undefined }));
        return request.save().then(function () {
        }).catch((err) => {
            assert(err);
        });
    });

});


describe('Delivery Model', function () {
    it('Delivery has no validation errors when given the proper info', function () {
        const delivery = new Delivery(validDelivery);
        delivery.validateSync();
    });

    it('Delivery gives errors when creating a Request with missing info', function () {
        const delivery = new Delivery(Object.assign({}, validDelivery, { city: undefined }));
        const error = delivery.validateSync();
        assert(error.errors['city'].message);
    });

    it('Creates a Delivery if valid', function () {
        const delivery = new Delivery(validDelivery);
        return delivery.save().then(function () {
        }).catch((err) => {
            assert.fail(err);
        });
    });

    it('Fails to create a Delivery if validator fails', function () {
        const delivery = new Delivery(Object.assign({}, validDelivery, { districtName: undefined }));
        return delivery.save().then(function () {
        }).catch((err) => {
            assert(err);
        });
    });

});
