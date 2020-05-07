const knex = require('knex')
const knexfile = require('../knexfile.js')

// we must select the development object from our knexfile and export
module.exports = knex(knexfile.development)