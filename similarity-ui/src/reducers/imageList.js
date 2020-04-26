import { FETCH_IMIAGE_LIST } from "actions/types";

export default function (state = {images: []}, action) {
    switch(action.type) {

        case FETCH_IMIAGE_LIST:

            return {
                ...state,
                images: action.payload.data
            };
        default: 
            return state;
    }
}