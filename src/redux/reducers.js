const initialState = {
    tempUser: {}
  };
  
  const rootReducers = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'TEMP_USER':
        return { ...state, tempUser: payload };
      default:
        return state;
    }
  };
  
  export default rootReducers;