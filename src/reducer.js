/// <reference path="../typings/index.d.ts" />

import {setEntries, next, vote} from './core';

/**
 * Perform the action
 * 
 * @export
 * @param {any} state
 * @param {any} action
 */
export default function reducer(state, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);            
        case 'VOTE':
            return vote(state, action.entry);
    }

    return state;
}