const express = require('express');
const Request = require('../models/Request');
const boostrapFields = require('../helpers/formsHelpers').bootstrapFields;
const passport = require('passport');
const router = express.Router();
//For User
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Chefs For Puerto Rico 🇵🇷'
  });
});

router.get('/request/new', function(req, res) {
  const form = Request.createForm({
    name: '*Su Nombre:',
    agency: 'Nombre la agencia:',
    email: 'Su Email, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
    phone: 'Su Telefono, lo podriamos usar para confirmar la solicitud y coordinar la entrega',
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
  });
  res.render('request/new', {
    title: 'Solicitud de Comida',
    form: form.toHTML(boostrapFields),
    message: `Por favor complete la información con la mayor cantidad de detalles posible, esto nos ayuda a verificar la solicitud y procesarla lo m&atilde;s pronto que podamos.<br>
      Los campos con *astericos son obligatorios.`,
    submitText: 'Enviar',
  });
});

router.get('/request/:shortId', function(req, res) {
  Request.findOne({
    shortId: req.params.shortId
  }).then(doc => {
    if (!doc) return res.status(404).render('404');
    console.log(doc.toJSON({
      virtuals: true
    }));
    res.render('request/details', {
      doc: doc.toJSON({
        virtuals: true
      }),
      title: `Detalles de la solicitud ${req.params.shortId}`
    });
  }).catch(err => {
    res.status(400).send(err);
  });
});

/*User sessions*/
router.get('/login', function(req, res) {
  const login_form = User.createLoginForm();
  res.render('user/login', {
    title: 'Login',
    form: login_form.toHTML(boostrapFields),
    message: '',
    submitText: 'Login',
    form_action:'/login',
  });
});

router.get('/signup',function(req,res){
  const signup_form = User.createSignUpForm();
  res.render('user/login', {
    title: 'Sign Up',
    form: signup_form.toHTML(boostrapFields),
    message: '',
    submitText: 'Sign Up',
    form_action:'/signup',
  });
});
router.post('/api/user/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
router.get('/test-auth', isLoggedIn, function(req, res) {

});

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = router;
