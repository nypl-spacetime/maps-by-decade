const fs = require('fs')
const R = require('ramda')
const postgis = require('spacetime-db-postgis')
const Handlebars = require('handlebars')
const config = require('./config.json')

const queries = {
  all: Handlebars.compile(fs.readFileSync('./sql/all.sql', 'utf8'))(config),
  grouped: Handlebars.compile(fs.readFileSync('./sql/grouped.sql', 'utf8'))(config)
}

Object.keys(queries).forEach((name) => {
  var query = queries[name]

  postgis.executeQuery(query, null, (err, rows) => {
    if (err) {
      console.error(err)
      return
    }

    const geojson = {
      type: 'FeatureCollection',
      features: rows.map((row) => ({
        type: 'Feature',
        properties: R.omit(['geometry'], row),
        geometry: row.geometry
      }))
    }

    fs.writeFileSync(`./data/${name}.geojson`, JSON.stringify(geojson))
  })
})
