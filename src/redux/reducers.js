import * as Types from './action';

const initialState = {
    currentComment: null,
    recoveryTopicModal: false,
    detailTopic: null,
    reportTopicId: null,
    listComment: [],
    myListComment: [],
}

const reducers = (state = initialState, {type, payload} = {}) => {
    let states = state;
    switch (type) {
        case Types.SET_CURRENT_USER:
            states = {...states, currentComment: payload};
            break;
        default:
            states = state;
            break;
    }
    return states;
}

export default reducers;