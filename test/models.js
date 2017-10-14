const Request = require('../models/Request');

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
    it("Creates a Food Request if valid", function (done) {
        const request = new Request(validRequest);
        request.save().then(function () {
            done();
        }).catch(function (err) {
            throw err;
        });
    });

    it("Fails to create a Food Request if validator fails", function (done) {
        const request = new Request(Object.assign({}, validRequest, { name: undefined }));
        request.save().then(function () {
        }).catch(function () {
            done();
        });
    });
});
