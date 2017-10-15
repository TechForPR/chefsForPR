const Request = require('../models/Request');
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

describe("Food Request Model", function () {
    it("Has no validation errors when given the proper info", function () {
        const request = new Request(validRequest);
        request.validateSync();
    });

    it('Gives errors when creating a Request with missing info', function () {
        const request = new Request(Object.assign({}, validRequest, { name: undefined }));
        const error = request.validateSync();
        assert(error.errors['name'].message);
    });

    it("Creates a Food Request if valid", function () {
        const request = new Request(validRequest);
        return request.save().then(function () {
        }).catch((err) => {
            assert.fail(err);
        });
    });

    it("Fails to create a Food Request if validator fails", function () {
        const request = new Request(Object.assign({}, validRequest, { name: undefined }));
        return request.save().then(function () {
        }).catch((err) => {
            assert(err);
        });
    });

});
