import * as Types from './action';

const initialState = {
    currentUser: {},
}

const reducers = (state = initialState, {type, payload} = {}) => {
    let states = state;
    switch (type) {
        case Types.SET_CURRENT_USER:
            states = {...states, currentUser: payload};
            break;
        default:
            states = state;
            break;
    }
    return states;
}

export default reducers;