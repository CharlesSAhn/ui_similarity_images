import { combineReducers } from 'redux';
import typesReducer from 'reducers/types';
import searchFieldReducer from 'reducers/searchField';
import imageList from 'reducers/imageList';
import image from 'reducers/image';

export default combineReducers({
    type: typesReducer,
    searchField: searchFieldReducer,
    imageList: imageList,
    image: image,
});