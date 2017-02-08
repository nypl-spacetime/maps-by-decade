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
  LIGHTBOX_NEXT,

  SET_FILTER,
  RESET_FILTERS,

  HIDE_INTRO
} from './constants'

export function loadData (file) {
  return {
    type: LOAD_DATA,
    file
  }
}

export function dataLoaded (file, data) {
  return {
    type: LOAD_DATA_SUCCESS,
    file,
    data
  }
}

export function dataLoadingError (file, error) {
  return {
    type: LOAD_DATA_ERROR,
    file,
    error
  }
}

export function newMiniMap (map) {
  return {
    type: NEW_MINI_MAP,
    map
  }
}

export function selectMaps (maps) {
  return {
    type: SELECT_MAPS,
    maps
  }
}

export function lockSelectedMaps (locked) {
  return {
    type: LOCK_SELECTED_MAPS,
    locked
  }
}

export function addTileLayerMap (feature) {
  return {
    type: ADD_TILE_LAYER_MAP,
    feature
  }
}

export function removeTileLayerMap (feature) {
  return {
    type: REMOVE_TILE_LAYER_MAP,
    feature
  }
}

export function clearTileLayerMaps () {
  return {
    type: CLEAR_TILE_LAYER_MAPS
  }
}

export function showLightbox (show, index) {
  return {
    type: SHOW_LIGHTBOX,
    show,
    index
  }
}

export function lightboxPrev () {
  return {
    type: LIGHTBOX_PREV
  }
}

export function lightboxNext () {
  return {
    type: LIGHTBOX_NEXT
  }
}

export function setFilter (filter, value) {
  return {
    type: SET_FILTER,
    filter,
    value
  }
}

export function resetFilters () {
  return {
    type: RESET_FILTERS
  }
}
