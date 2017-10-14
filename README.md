# Chefs For Puerto Rico

Platform to manage the distribution of meals created by World Central Kitchen.

The project is developed in ExpressJs, using MongoDB as a backend, and
handlebars for templates.

## Context

[World Central Kitchen](https://www.worldcentralkitchen.org/) is changing the world through
the eyes of a chef. As
chefs, our work in the kitchen improves health, increases education rates,
provides career skills, and creates food businesses.

They are working on Puerto Rico with a group of chefs, and local providers to make over 100k meals
a day that are then distributed to people in need around the island.

This project aims to help them improve their impact by helping them reach the people in need in the island.

## Installing

Clone this repo and navigate to the root to install all
the dependencies.

```
git clone git@github.com:TechForPR/chefsForPR.git
cd chefsForPR
npm install
```

## Mongod DB

On mac, use [homebrew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/): `brew install mongodb`.

In other platforms, find instructions on the mongo website:
[Install mongodb](https://docs.mongodb.com/manual/installation/).

To run the application, start mongo on a differnet terminal window, or as a daemon process, and then:

```
npm start
```

If successful, you should see the following message:

```
Listening on port 3000
Connected to Mongo DB
```

And navigate to [localhost:3000](http://localhost:3000)

## Contributing

Steps for contributing should feel very familiar if you have  worked in any open source
project in the past, but feel free to help in any way you can at any skill level. We're
here to help you get started.

### How to help

Checkout the [contribution](https://github.com/TechForPR/chefsForPR/blob/master/.github/CONTRIBUTING.md)
 guide for more details.

**Slack**: To join the discussion request a slack invite by emailing
filling out [this form](techqueria.org/slack) or emailing
puertorico@techqueria.org . Once you're in slack, find a channel
named #chefsforpr

## Coverage

Jose Andres and his work have been featured in some news channels:

[CNN - Chef steps up amid Puerto Rico's food crisis](http://edition.cnn.com/videos/world/2017/09/28/chef-jose-andres-loves-feeding-the-many-lead-dnt-weir.cnn)

[450,000 MEALS WITH #CHEFSFORPUERTORICO](https://www.worldcentralkitchen.org/300000-meals-counting-chefsforpuertorico)
