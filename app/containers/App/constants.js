/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_DATA = 'mbd/App/LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'mbd/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'mbd/App/LOAD_DATA_ERROR';

export const NEW_MINI_MAP = 'mbd/Homepage/NEW_MINI_MAP';

export const SELECT_MAPS = 'mbd/DecadePage/SELECT_MAPS';
export const LOCK_SELECTED_MAPS = 'mbd/DecadePage/LOCK_SELECTED_MAPS';

export const ADD_TILE_LAYER_MAP = 'mbd/DecadePage/ADD_TILE_LAYER_MAP';
export const REMOVE_TILE_LAYER_MAP = 'mbd/DecadePage/REMOVE_TILE_LAYER_MAP';
export const CLEAR_TILE_LAYER_MAPS = 'mbd/DecadePage/CLEAR_TILE_LAYER_MAPS';

export const SHOW_LIGHTBOX = 'mbd/DecadePage/SHOW_LIGHTBOX';
export const LIGHTBOX_PREV = 'mbd/DecadePage/LIGHTBOX_PREV';
export const LIGHTBOX_NEXT = 'mbd/DecadePage/LIGHTBOX_NEXT';
