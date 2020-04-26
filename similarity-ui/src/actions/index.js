import axios from 'axios';
import { SAVE_TYPES, SAVE_SEARCH_STRING, FETCH_IMIAGE_LIST } from 'actions/types';

export function savedTypes(type){
    return {
        type: SAVE_TYPES,
        payload: type
    };
}

export function saveSearchString(searchString){
    return {
        type: SAVE_SEARCH_STRING,
        payload: searchString
    }
}

export function fetchImageList(){
    const response = axios.get('https://341llhka93.execute-api.us-east-1.amazonaws.com/api/images');
    
    return {
        type: FETCH_IMIAGE_LIST,
        payload: response
    };
}