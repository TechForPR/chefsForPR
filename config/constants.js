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

const requestLabelsSpanish = {
    name: '*Su Nombre:',
    agency: 'Nombre la agencia:',
    email: '*Su Email, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
    phone: '*Su Telefono, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
    twitter: 'Link a su perfil Twitter',
    facebook: 'Link a su perfil de Facebook',
    address: '*Dirección donde realizar la entrega',
    city: '*Ciudad',
    zipcode: '*Zipcode',
    'amountOfPeople': '*Cantidad de personas',
    'amountOfDays': 'Para cuantos días desea hacer la solicitud',
    'receivingFoodAlready': 'Está recibiendo comida actualmente?',
    'receivingFoodAlreadyDetails': 'Si está recibiendo comida, cuentenemos más acerca de lo que está recibiendo.',
    'currentlyHaveFoodFor': 'Para cuantos más diás tiene comida?',
    'currentlyHaveFoodForDetails': 'Cuentemos más...',
    'breakfast': '*Cuantos desayunos necesita?',
    'lunch': '*Cuantos almuerzos necesita?',
    'dinner': '*Cuantas cenas necesita?',
    'dietaryRestrictions': 'Tiene alguna restricción alimenticia?',
    'needBy': 'En que fecha espera la comida',
  };

const requestLabelsEnglish = {
    name: '*Your Name:',
    agency: 'Agency Name:',
    email: '*Your Email, used to confirm the request and coordinate the delivery',
    phone: '*Your Phone, used to confirm the request and coordinate the delivery',
    twitter: 'Link to your Twitter profile',
    facebook: 'Link to your Facebook profile',
    address: '*Address for delivery',
    city: '*City',
    zipcode: '*Zipcode',
    'amountOfPeople': '*Amount of people',
    'amountOfDays': 'For how many days of delivery is this request?',
    'receivingFoodAlready': 'Are you currently receiving food?',
    'receivingFoodAlreadyDetails': 'If currently receiving food, tell us more about what you are receiving',
    'currentlyHaveFoodFor': 'For how many more days do you have food?',
    'currentlyHaveFoodForDetails': 'Tell us more...',
    'breakfast': '*How many breakfasts do you need?',
    'lunch': '*How many lunches do you need?',
    'dinner': '*How many dinners do you need?',
    'dietaryRestrictions': 'Do you have any dietary restrictions?',
    'needBy': 'By what date do you need the food?',
  };

module.exports = {
    requestStatuses,
    longDateFormat,
    deliveryStatuses,
    requestLabelsSpanish,
    requestLabelsEnglish,
}
