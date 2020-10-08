import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';
import { getAuthTokenFromLocalStorage } from '../helper/utils';
import { APIUrls } from '../helper/urls';

export function searchUser(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        console.log('SEARCH data', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
