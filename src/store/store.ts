import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootreducer';

export type RootState = ReturnType<typeof rootReducer>

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer,undefined,composedEnhancers)

