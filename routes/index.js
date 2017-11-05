const express = require('express');
const Request = require('../models/Request');
const boostrapFields = require('../helpers/formsHelpers').bootstrapFields;
const middleware = require('../middlewares');
const requestLabelsSpanish = require('../config/constants').requestLabelsSpanish;
const requestLabelsEnglish = require('../config/constants').requestLabelsEnglish;
const Delivery = require('../models/Delivery');

const router = express.Router();
//For User
const User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Chefs For Puerto Rico 🇵🇷'
  });
});

router.get('/requests', function (req, res) {
  res.render('request/list', { title: 'Request dashboard'});
});

router.get('/deliveries', function (req, res) {
  res.render('delivery/list', { title: 'Deliveries dashboard'});
});

router.get('/delivery/new', function (req, res) {
  const form = Delivery.createForm({
    agency: '*Name of organization',
    districtName: '*District Name / Neighborhood',
    municipality: '*Municipality',
    city: '*City',
    lastDayOfDelivery: '*Last day of delivery?',
    numberOfMealsDelivered: '*Number of Meals delivered',
    demandSuplyGap: 'Demand and supply gap?',
    requestNumber: 'Request Id (if fullfilling a request)',
  });
  res.render('delivery/new', {
    title: 'Register Delivery', form: form.toHTML(boostrapFields),
    message: `Thanks for your delivery, filling out this form helps us track the progress
    being made in very district so we can allocate better resources.<br>
    Fields with *asterisks are required.`,
    submitText: 'Submit',
  });
});

router.get('/request/new/:language', function (req, res) {
  if(req.params.language == 'spanish') {
    const form = Request.createForm(requestLabelsSpanish, 'spanish');
    res.render('request/new', {
      title: 'Solicitud de Comida', form: form.toHTML(boostrapFields),
      message: `Por favor complete la información con la mayor cantidad de detalles posible, esto nos ayuda a verificar la solicitud y procesarla lo m&atilde;s pronto que podamos.<br>
        Los campos con *astericos son obligatorios.`,
      submitText: 'Enviar',
    });
  } else {
    const form = Request.createForm(requestLabelsEnglish, 'english');
    res.render('request/new', {
      title: 'Food Request', form: form.toHTML(boostrapFields),
      message: `Please complete the information with as much detail as possible, this helps us verify your request and process it as fast as we can.<br>
        Fields with *asterisks are required.`,
      submitText: 'Submit',
    });
  }
});

router.get('/request/:shortId*?', function (req, res) {
  Request.findOne({ shortId: req.params.shortId }).then(doc => {
    if (!doc) return res.status(404).render('404');
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


router.get('/delivery/:shortId*?', function (req, res) {
  Delivery.findOne({ shortId: req.params.shortId }).then(doc => {
    if (!doc) return res.status(404).render('404');
    res.render('delivery/details', { doc: doc.toJSON({ virtuals: true }), title: `Delivery details ${req.params.shortId}`});
  }).catch(err => {
    res.status(400).send(err);
  });
});

/*User routes*/
router.get('/login', middleware.nonLoggedInOnly,function(req, res) {
  const login_form = User.createLoginForm();
  res.render('user/login', {
    title: 'Login',
    form: login_form.toHTML(boostrapFields),
    message: '',
    submitText: 'Login',
    form_type:'login',
    other_page:{
      intro_text:"Don't have an account?",
      main_text:'Sign up',
      path:'/signup'
    }
  });
});

router.get('/signup',middleware.nonLoggedInOnly,function(req,res){
  const signup_form = User.createSignUpForm();
  res.render('user/login', {
    title: 'Sign Up',
    form: signup_form.toHTML(boostrapFields),
    message: '',
    submitText: 'Sign Up',
    form_type:'signup',
    other_page:{
      intro_text:'Already have an account?',
      main_text:'Log In',
      path:'/login'
    }
  });
});
router.get('/users',function(req,res){
  res.render('user/list',{
    title:'Users',
  })
});
router.get('/users/profile',[middleware.loggedInOnly,middleware.nonAdminsOnly],function(req,res){
  res.render('user/profile', {
    title: 'Profile',
  });
});
router.get('/test-auth', middleware.loggedInOnly, function(req, res) {
  res.render('user/auth-test', {
    user:req.user
  });
});
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
