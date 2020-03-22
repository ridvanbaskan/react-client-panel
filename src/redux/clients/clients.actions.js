import { firestore } from '../../firebase/firebase.utils';

export const toggleClick = () => ({
  type: 'TOGGLE_CLICK'
});

export const fetchCollectionsStart = () => ({
  type: 'FETCH_COLLECTIONS_START'
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: 'FETCHING_COLLECTIONS_SUCCESS',
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: 'FETCHING_COLLECTIONS_FAILURE',
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('clients');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapShot => {
        const collectionsMap = snapShot.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.Message)));
  };
};
