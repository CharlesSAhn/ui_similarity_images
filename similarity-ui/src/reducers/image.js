import { SELECTED_IMAGE } from "actions/types";

export default function (state = {selectedImage: null}, action) {
    switch(action.type) {

        case SELECTED_IMAGE:
           
            return {
                ...state,
                selectedImage: action.payload
            };
        default: 
            return state;
    }
}