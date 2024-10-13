export enum ActionTypes {
    TOGGLE_OPEN = 'TOGGLE_OPEN',
    TOGGLE_CHECKOUT_DIALOG = 'TOGGLE_CHECKOUT_DIALOG',
    ADD_TO_CART_IDENTIFIER = 'ADD_TO_CART_IDENTIFIER'
}

export type ToggleOpenAction = {
    type: ActionTypes.TOGGLE_OPEN
}

export type ToggleCheckoutDialogueAction = {
    type: ActionTypes.TOGGLE_CHECKOUT_DIALOG
}

export type SetAddToCartIdentifier = {
    type: ActionTypes.ADD_TO_CART_IDENTIFIER,
    payload: string
}


export type Actions = 
| ToggleOpenAction
| ToggleCheckoutDialogueAction
| SetAddToCartIdentifier