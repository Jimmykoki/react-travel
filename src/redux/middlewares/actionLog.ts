import { Middleware } from 'redux';

export const actionLog: Middleware =
  (store: any) => (next: any) => (action: any) => {
    console.log('current state: ', store.getState());
    console.log('action: ', action);
    //next is a function that will call the next middleware or the reducer
    next(action);
    console.log('next state: ', store.getState());
  };
