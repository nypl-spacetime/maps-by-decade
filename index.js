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

//     boundingBox: [
//       row.xmin,
//       row.ymin,
//       row.xmax,
//       row.ymax
//     ]

// R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}


// postgis.executeQuery(queries.all, null, (err, rows) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//
//   const geojson = {
//     type: 'FeatureCollection',
//     features: rows.map((row) => ({
//       type: 'Feature',
//       properties: {
//         id: row.id,
//         band: row.band,
//         name: row.name,
//         uuid: row.data.uuid,
//         nyplDigitalId: row.data.nyplDigitalId,
//         boundingBox: [
//           row.xmin,
//           row.ymin,
//           row.xmax,
//           row.ymax
//         ]
//       },
//       geometry: row.geometry
//     }))
//   }
//
//   fs.writeFileSync('./data/all.geojson', JSON.stringify(geojson, null, 2))
// })
//
// postgis.executeQuery(queries.grouped, null, (err, rows) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//
//   const geojson = {
//     type: 'FeatureCollection',
//     features: rows.map((row) => ({
//       type: 'Feature',
//       properties: {
//         band: row.band,
//         count: row.count
//       },
//       geometry: row.geometry
//     }))
//   }
//
//   fs.writeFileSync('./data/grouped.geojson', JSON.stringify(geojson, null, 2))
// })
