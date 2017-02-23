# NYC Space/Time Directory - Maps by Decade

__Visit [Maps by Decade](http://spacetime.nypl.org/maps-by-decade)!__

Maps by Decade shows New York City street maps from the New York Public Library's [Lionel Pincus and Princess Firyal Map Division](https://www.nypl.org/about/divisions/map-division), grouped by decade.

Maps by Decade shows more than 5,000 large-scale maps (i.e. maps depicting an area smaller than 5 km²) of New York City that are digitized, georectified, and in the public domain (or of which the Library holds the copyright). You can browse 20,000 more maps and atlases in NYPL's [Digital Collections](http://digitalcollections.nypl.org/), the Library's database of its digitized collections. Or visit [Map Warper](http://maps.nypl.org/warper), our online tool for rectifying public domain maps.

For more information, see Map by Decade's [About page](http://spacetime.nypl.org/maps-by-decade/#about).

[![Screenshot of Maps by Decade](images/screenshot.png)](http://spacetime.nypl.org/maps-by-decade)

## NYC Space/Time Directory

Maps by Decade is part of the [NYC Space/Time Directory](http://spacetime.nypl.org), an NYLP project which makes urban history accessible through a wide variety of resources. Major support for the NYC Space/Time Directory is provided by the [Knight News Challenge](http://www.knightfoundation.org/grants/6715), an initiative of the [John S. and James L. Knight Foundation](http://www.knightfoundation.org/).

<img src="app/images/knight-foundation.png" width="50%">

## Technology

Maps by Decade is built using the following open source projects:

- __[Leaflet](http://leafletjs.com/)__: JavaScript library for interactive maps
- __[Leaflet.Sync](https://github.com/turban/Leaflet.Sync)__: synchronized panning and zooming for Leaflet maps
- __[RBush](https://github.com/mourner/rbush)__: JavaScript R-tree-based 2D spatial index for points and rectangles
- __[Turf](http://turfjs.org/)__: geospatial analysis and algorithms for JavaScript
- __[`react-boilerplate`](https://github.com/react-boilerplate/react-boilerplate)__: I like React and Redux and webpack but I'm not smart enough to set up my own project and combine everything together. `react-boilerplate` does this for me. It has 10,000 dependencies and seems a bit too complicated, but maybe there's no way around that.

## Installation

To run Maps by Decade locally, first clone this repository:

    git clone https://github.com/nypl-spacetime/maps-by-decade.git
    cd maps-by-decade

Then, install all dependencies:

    npm install

To start Maps by Decade, run:

    npm run start-no-local-data

By running `start-no-local-data`, Maps by Decade will load its data [from GitHub](https://github.com/nypl-spacetime/maps-by-decade-data).

It's also possible to serve Maps by Decade's data files locally. To do this, run:

    npm start

By default, Maps by Decade expects its two data files (e.g. `all.geojson` and `grouped.geojson`) to be available on http://maps-by-decade-data.dev/, but you can change this by editing [`config/default.yml`](config/default.yml).

To use the `.dev` domain, Maps by Decade uses [Hotel](https://github.com/typicode/hotel):

Install Hotel:

    npm install -g hotel && hotel start

Install [http-server](https://github.com/indexzero/http-server):

    npm install http-server -g

Then, clone Maps by Decade's data repository:

    git clone https://github.com/nypl-spacetime/maps-by-decade-data
    cd maps-by-decade-data

Add a Hotel dev server in the data directory, with CORS enabled:

    hotel add 'http-server -p $PORT --cors'

Now, the Maps by Decade data files are available on http://maps-by-decade-data.dev/.

To build Maps by Decade, run:

    npm run build

The `build` directory will now contain HTML, JS and CSS files you can distribute.
