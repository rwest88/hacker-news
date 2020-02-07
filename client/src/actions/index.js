export const addSearchTerm = text => {
  return (dispatch, getState) => {
    let allSearchTerms = getState().searchTerms.allSearchTerms;
    allSearchTerms = allSearchTerms.concat([text]);
    dispatch({
      type: 'ADD_SEARCH_TERM',
      data: allSearchTerms
    });
  }
}