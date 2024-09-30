import { ActionTypes, Actions } from "../actions";

export type State = {
    isOpen:  boolean,
    isCheckoutOpen: boolean
}

export const initialState: State = {
    isOpen: false,
    isCheckoutOpen: false
}

export function reducer(state: State, action: Actions) {
    switch(action.type) {
        case ActionTypes.TOGGLE_OPEN: 
            return {...state, isOpen: !state.isOpen}
        case ActionTypes.TOGGLE_CHECKOUT_DIALOG: 
            return {...state, isCheckoutOpen: !state.isCheckoutOpen}
        default: 
            return state;
    }
}