import { ActionTypes, Actions } from "../actions";

export type State = {
    isOpen:  boolean,
}

export const initialState: State = {
    isOpen: false,
}

export function reducer(state: State, action: Actions) {
    switch(action.type) {
        case ActionTypes.TOGGLE_OPEN: 
            return {isOpen: !state.isOpen}
        default: 
            return state;
    }
}