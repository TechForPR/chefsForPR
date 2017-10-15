const express = require('express');
const Request = require('../models/Request');
const boostrapFields = require('../helpers/formsHelpers').bootstrapFields;

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Chefs For Puerto Rico 🇵🇷' });
});

router.get('/request/new/:language', function (req, res) {
  if(req.params.language == 'spanish') {
    const form = Request.createForm({
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
    }, 'spanish');
    res.render('request/new', {
      title: 'Solicitud de Comida', form: form.toHTML(boostrapFields),
      message: `Por favor complete la información con la mayor cantidad de detalles posible, esto nos ayuda a verificar la solicitud y procesarla lo m&atilde;s pronto que podamos.<br>
        Los campos con *astericos son obligatorios.`,
      submitText: 'Enviar',
    });
  } else if (req.params.language == 'english') {
    const form = Request.createForm({
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
    }, 'english');
    res.render('request/new', {
      title: 'Food Request', form: form.toHTML(boostrapFields),
      message: `Please complete the information with as much detail as possible, this helps us verify your request and process it as fast as we can.<br>
        Fields with *asterisks are required.`,
      submitText: 'Submit',
    });
  }
});

router.get('/request/:shortId', function (req, res) {
  Request.findOne({ shortId: req.params.shortId }).then(doc => {
    if (!doc) return res.status(404).render('404');
    console.log( doc.toJSON({ virtuals: true }));
    res.render('request/details', { doc: doc.toJSON({ virtuals: true }), title: `Detalles de la solicitud ${req.params.shortId}`});
  }).catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
