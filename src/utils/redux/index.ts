import {store} from '@store';
import {AnyAction} from 'redux';

/* 
    getting redux state 
    note: 
    - we use this function to get redux state outside functional component
    - in functional component we can replace this function with a useSelector as it's working as a hooks if the data changes
*/
export const getState = () => {
  return store.getState();
};

/*
    call redux actions using this function
    note:
    - we can use this function inside/outside a component
*/
export const dispatch = (action: AnyAction) => {
  return store.dispatch(action);
};
