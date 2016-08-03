/// <reference path="./typings/index.d.ts" />
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer();