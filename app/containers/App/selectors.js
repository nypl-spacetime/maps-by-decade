import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectData = (file) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['data', file])
);

const selectGeoJSON = (file) => createSelector(
  selectGlobal(),
  (globalState) => {
    const flatten = list => list.reduce(
      (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );

    return {
      type: 'FeatureCollection',
      features: flatten(Object.values(globalState.getIn(['data', file])))
    };
  }
);

const selectDecadeGeoJSON = (file, band) => createSelector(
  selectGlobal(),
  (globalState) => {
    const bands = globalState.getIn(['data', file]);
    if (bands) {
      const bandInt = parseInt(band);

      return {
        type: 'FeatureCollection',
        features: bands[bandInt]
      }
    }
  }
);

const selectPreviousDecade = (band) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['bands', band, 'prev'])
);

const selectNextDecade = (band) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['bands', band, 'next'])
);

const selectSelectedMaps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMaps')
);

const selectSelectedMapsLocked = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMapsLocked')
);

const selectTileUrl = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('tileUrl')
);

const selectShowLightbox = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('showLightbox')
);

const selectLightboxIndex = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('lightboxIndex')
);

const selectLightboxImages = (quality = 'q') => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedMaps').map((map) => `http://images.nypl.org/index.php?id=${map.properties.digital_id}&t=${quality}`)
);

const selectLightboxTitle = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const maps = globalState.get('selectedMaps');
    const index = globalState.get('lightboxIndex');

    if (maps && maps[index]) {
      return maps[index].properties.name
    }
  }
);

const selectMiniMaps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('miniMaps').toJS()
);

const selectMapOptions = (type) => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'mapOptions', type]).toJS()
);

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectLoading,
  selectData,
  selectGeoJSON,
  selectDecadeGeoJSON,
  selectMapOptions,
  selectLocationState,
  selectMiniMaps,
  selectSelectedMaps,
  selectSelectedMapsLocked,
  selectPreviousDecade,
  selectNextDecade,
  selectTileUrl,
  selectShowLightbox,
  selectLightboxIndex,
  selectLightboxImages,
  selectLightboxTitle
};
