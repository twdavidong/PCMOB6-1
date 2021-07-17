export const LOG_IN = "log_in";
export const LOG_OUT = "log_out";

export function loginAction() {

    return {type: LOG_IN}
}

export function logoutAction() {

    return {type: LOG_OUT}
}

const initialState = {
    token : null,
}

export default function blogAuthReducer(state = initialState, action) {
    switch (action.type) {
        case "log_in":
            return {...state, token: action.payload}
        case "log_out":
            return {...state, token: null}
        default:
            return state
    }
}