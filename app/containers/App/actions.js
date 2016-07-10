/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

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

export function loadData(file) {
  return {
    type: LOAD_DATA,
    file
  };
}

export function dataLoaded(file, data) {
  return {
    type: LOAD_DATA_SUCCESS,
    file,
    data
  };
}

export function dataLoadingError(file, error) {
  return {
    type: LOAD_DATA_ERROR,
    file,
    error
  };
}

export function newMiniMap(map) {
  return {
    type: NEW_MINI_MAP,
    map
  };
}

export function selectMaps(maps) {
  return {
    type: SELECT_MAPS,
    maps
  };
}

export function lockSelectedMaps(locked) {
  return {
    type: LOCK_SELECTED_MAPS,
    locked
  };
}

export function addTileLayerMap(feature) {
  return {
    type: ADD_TILE_LAYER_MAP,
    feature
  };
}

export function removeTileLayerMap(feature) {
  return {
    type: REMOVE_TILE_LAYER_MAP,
    feature
  };
}

export function clearTileLayerMaps() {
  return {
    type: CLEAR_TILE_LAYER_MAPS,
    feature
  };
}

export function showLightbox(show, index) {
  return {
    type: SHOW_LIGHTBOX,
    show,
    index
  };
}

export function lightboxPrev() {
  return {
    type: LIGHTBOX_PREV
  };
}

export function lightboxNext() {
  return {
    type: LIGHTBOX_NEXT
  };
}
