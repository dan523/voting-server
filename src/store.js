/// <reference path="../typings/index.d.ts" />

import {createStore} from 'redux';
import reducer from './reducer';

/**
 * Make a redux store
 * 
 * @export
 * @returns
 */
export default function makeStore() {
    return createStore(reducer);
}