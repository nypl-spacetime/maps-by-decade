/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  NEW_MINI_MAP,
  SELECT_MAPS,
  LOCK_SELECTED_MAPS,
  ADD_TILE_LAYER_MAP,
  REMOVE_TILE_LAYER_MAP,
  CLEAR_TILE_LAYER_MAPS,
  SHOW_LIGHTBOX,
  LIGHTBOX_PREV,
  LIGHTBOX_NEXT
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: null,
  decade: null,
  mapId: null,
  selectedMaps: [],
  selectedMapsLocked: false,
  showLightbox: false,
  ligtboxIndex: 0,
  tileLayerMaps: fromJS({}),
  data: {
    all: null,
    grouped: null
  },
  bands: fromJS({}),
  miniMaps: fromJS([]),
  config: fromJS(__CONFIG__)
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      var data = {};

      action.data.features.forEach((feature) => {
        const band = feature.properties.band;
        if (!data[band]) {
          data[band] = [];
        }

        data[band].push(feature);
      });

      var newState = state
        .setIn(['data', action.file], data);

      if (action.file === 'grouped') {
        var nextPrevBands = {};
        var bands = new Set();

        action.data.features.forEach((feature) => {
          const band = feature.properties.band;
          bands.add(band);
        });

        const sortedBands = [...bands].sort();

        sortedBands.forEach((band, i) => {
          nextPrevBands[band] = {
            prev: sortedBands[i - 1],
            next: sortedBands[i + 1]
          };
        });
        newState = newState.set('bands', fromJS(nextPrevBands));
      }

      var loaded = true
      for (let value of newState.get('data').values()) {
        loaded = loaded && (value ? true : false);
      }

      return newState
        .set('loading', !loaded);
    case NEW_MINI_MAP:
      return state
        .update('miniMaps', (miniMaps) => miniMaps.push(action.map));
    case LOCATION_CHANGE:
      return state
        .set('selectedMaps', [])
        .set('selectedMapsLocked', false)
        .set('ligtboxIndex', 0)
        .set('tileLayerMaps', fromJS({}),);
    case SELECT_MAPS:
      return state
        .set('selectedMaps', action.maps)
        .set('ligtboxIndex', 0);
    case LOCK_SELECTED_MAPS:
      return state
        .set('selectedMapsLocked', action.locked);
    case ADD_TILE_LAYER_MAP:
      var id = action.feature.properties.id;
      return state
        .set('tileLayerMaps', fromJS({}))
        .update('tileLayerMaps', (tileLayerMaps) => tileLayerMaps.set(id, action.feature));
    case REMOVE_TILE_LAYER_MAP:
      var id = action.feature.properties.id;
      return state
        .update('tileLayerMaps', (tileLayerMaps) => tileLayerMaps.delete(id));
    case CLEAR_TILE_LAYER_MAPS:
      return state
        .set('tileLayerMaps', fromJS({}));
    case SHOW_LIGHTBOX:
      return state
        .set('showLightbox', action.show)
        .set('lightboxIndex', action.index);
    case LIGHTBOX_PREV:
      var selectedMapsLength = state.get('selectedMaps').length;
      return state
        .update('lightboxIndex', (lightboxIndex) => ((lightboxIndex - 1) + selectedMapsLength) % selectedMapsLength);
    case LIGHTBOX_NEXT:
      var selectedMapsLength = state.get('selectedMaps').length;
      return state
        .update('lightboxIndex', (lightboxIndex) => (lightboxIndex + 1) % selectedMapsLength);
    default:
      return state;
  }
}

export default appReducer;
