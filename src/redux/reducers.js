import * as Types from './action';

const initialState = {
    currentUser: {},
    projectList: []
}

const reducers = (state = initialState, {type, payload} = {}) => {
    let states = state;
    switch (type) {
        case Types.SET_CURRENT_USER:
            states = {...states, currentUser: payload};
            break;
        case Types.SET_PROJECT_LIST:
            states = {...states, projectList: payload}
        default:
            states = state;
            break;
    }
    return states;
}

export default reducers;