import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AnyAction } from 'redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { rootReducer } from './rootreducer';



const middleWares = [logger,thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer,undefined,composedEnhancers)

export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, null, AnyAction> 