import React from 'react'

function NoMapsFound (props) {
  const yearMin = props.groupBounds[0]
  const yearMax = props.groupBounds[1]

  return (
    <div>
      <p>
        No results were found for you search.
      </p>
      <p>
        Maps by Decade contains only digitized, street level maps of New York City from {yearMin} to {yearMax}.
        Search for more maps through NYPL's <a href='http://digitalcollections.nypl.org'>Digital Collections</a> or contact the <a href='https://www.nypl.org/about/divisions/map-division'>Map Division</a>.
      </p>
    </div>
  )
}

export default NoMapsFound
