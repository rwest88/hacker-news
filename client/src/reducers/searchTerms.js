const initialState = {
  allSearchTerms: [],
  uniqueSearchTerms: [],
};

const searchTerms = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_TERM':
      return {
        ...state,
        allSearchTerms: action.data
      };
    case 'FILTER_SEARCH_TERMS':
      return {
        ...state,
        allSearchTerms: action.data
      };
    default:
      return state;
  }
};

export default searchTerms;