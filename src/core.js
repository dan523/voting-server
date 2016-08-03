/// <reference path="../typings/index.d.ts" />
import {List} from 'immutable';

/**
 * Set the entries for the state
 * 
 * @export
 * @param {Map} state
 * @param {List} entries
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}