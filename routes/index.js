const express = require('express');
const Request = require('../models/Request');
const boostrapFields = require('../helpers/formsHelpers').bootstrapFields;

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Chefs For Puerto Rico 🇵🇷' });
});

router.get('/request/new', function (req, res) {
  const form = Request.createForm({
    name: '*Su Nombre:',
    agency: '*Nombre la agencia:',
    email: 'Su Email, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
    phone: 'Su Telefono, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
    twitter: 'Link a su perfil Twitter',
    facebook: 'Link a su perfil de Facebook',
    address: '*Dirección donde realizar la entrega',
    zipcode: 'Zipcode',
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
  });
  res.render('request/new', {
    title: 'Solicitud de Comida', form: form.toHTML(boostrapFields),
    message: `Por favor complete la información con la mayor cantidad de detalles posible, esto nos ayuda a verificar la solicitud y procesarla lo m&atilde;s pronto que podamos.<br>
      Los campos con *astericos son obligatorios.`,
    submitText: 'Enviar',
  });
});

module.exports = router;
