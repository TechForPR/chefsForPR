const requestStatuses = [
    'new',
    'valid',
    'invalid',
    'delivered',
    'duplicate',
    'pending',
];

const deliveryStatuses = [
    'new',
    'valid',
    'invalid',
];

const longDateFormat = 'MMMM DD YYYY hh:mm A';

module.exports = {
    requestStatuses,
    longDateFormat,
    deliveryStatuses,
}
