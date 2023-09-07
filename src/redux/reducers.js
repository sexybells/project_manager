import * as Types from './action';

const initialState = {
    currentUser: {},
    projectList: [],
    devList: [],
    testerList: []
}

const reducers = (state = initialState, {type, payload} = {}) => {
    let states = state;
    switch (type) {
        case Types.SET_CURRENT_USER:
            states = {...states, currentUser: payload};
            break;
        case Types.SET_PROJECT_LIST:
            states = {...states, projectList: payload};
            break;
        case Types.SET_DEV_LIST:
            states = {...states, devList: payload};
            break;
        case Types.SET_TESTER_LIST:
            states = {...states, testerList: payload};
            break;
        default:
            states = state;
            break;
    }
    return states;
}

export default reducers;