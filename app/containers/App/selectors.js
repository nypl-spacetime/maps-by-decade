import { createSelector } from 'reselect'

const selectGlobal = () => (state) => state.get('global')

const selectHasTouch = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('hasTouch')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
)

const selectData = (file) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['data', file])
)

const selectGeoJSON = (file) => createSelector(
  selectGlobal(),
  (globalState) => {
    const data = globalState.getIn(['data', file])

    if (!data) {
      return {
        type: 'FeatureCollection',
        features: []
      }
    }

    const flatten = (list) => list.reduce(
      (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    )

    return {
      type: 'FeatureCollection',
      features: flatten(Object.values(data))
    }
  }
)

const selectDecadeGeoJSON = (file, group) => createSelector(
  selectGlobal(),
  (globalState) => {
    const groups = globalState.getIn(['data', file])
    if (groups) {
      // TODO: oeoeoeeoeoeoeoeoeoeoeoeoeo
      const groupInt = parseInt(group)

      return {
        type: 'FeatureCollection',
        features: groups[groupInt]
      }
    }
  }
)

const selectGroups = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('groups').toJS()
)

const selectPreviousDecade = (group) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['nextPrevGroups', group, 'prev'])
)

const selectNextDecade = (group) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['nextPrevGroups', group, 'next'])
)

const selectGroupBounds = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('groupBounds')
)

const selectMapCount = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('mapCount')
)

const selectSelectedMaps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMaps')
)

const selectSelectedMapsLocked = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMapsLocked')
)

const selectTileLayerMaps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('tileLayerMaps')
)

const selectShowLightbox = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('showLightbox')
)

const selectLightboxIndex = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('lightboxIndex')
)

const selectLightboxImages = (quality = 'q') => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMaps').map((map) => `http://images.nypl.org/index.php?id=${map.properties.imageId}&t=${quality}`)
)

const selectLightboxTitle = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const maps = globalState.get('selectedMaps')
    const index = globalState.get('lightboxIndex')

    if (maps && maps[index]) {
      return maps[index].properties.name
    }
  }
)

const selectHasFilters = () => createSelector(
  selectGlobal(),
  (globalState) => {
    return Object.keys(globalState.get('filters').toJS()).length !== 0
  }
)

const selectFilters = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('filters').toJS()
)

const selectMiniMaps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('miniMaps').toJS()
)

const selectMapOptions = (type) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'mapOptions', type]).toJS()
)

const selectDataConfig = (type) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'data']).toJS()
)

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectHasTouch,
  selectLoading,
  selectData,
  selectGeoJSON,
  selectDecadeGeoJSON,
  selectMapOptions,
  selectDataConfig,
  selectLocationState,
  selectMiniMaps,
  selectSelectedMaps,
  selectSelectedMapsLocked,
  selectGroups,
  selectPreviousDecade,
  selectNextDecade,
  selectGroupBounds,
  selectMapCount,
  selectTileLayerMaps,
  selectShowLightbox,
  selectLightboxIndex,
  selectLightboxImages,
  selectLightboxTitle,
  selectFilters,
  selectHasFilters
}
