export enum ActionTypes {
    TOGGLE_OPEN = 'TOGGLE_OPEN'
}

export type ToggleOpenAction = {
    type: ActionTypes.TOGGLE_OPEN,
}

export type Actions = ToggleOpenAction;