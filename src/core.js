/// <reference path="../typings/index.d.ts" />
import {List, Map} from 'immutable';

/**
 * Set the entries for the state
 * 
 * @export
 * @param {any} state
 * @param {List} entries
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * Return the next state ready for vote
 * 
 * @export
 * @param {any} state
 * @returns
 */
export function next(state) {
    let entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}