export enum ActionTypes {
    TOGGLE_OPEN = 'TOGGLE_OPEN',
    TOGGLE_CHECKOUT_DIALOG = 'TOGGLE_CHECKOUT_DIALOG'
}

export type ToggleOpenAction = {
    type: ActionTypes.TOGGLE_OPEN
}

export type ToggleCheckoutDialogueAction = {
    type: ActionTypes.TOGGLE_CHECKOUT_DIALOG
}


export type Actions = 
| ToggleOpenAction
| ToggleCheckoutDialogueAction;