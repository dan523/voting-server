/// <reference path="../typings/index.d.ts" />

/**
 * Set the entries for the state
 * 
 * @export
 * @param {Map} state
 * @param {List} entries
 */
export function setEntries(state, entries) {
    return state.set('entries', entries);
}