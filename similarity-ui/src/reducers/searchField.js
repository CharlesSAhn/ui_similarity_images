import { SAVE_SEARCH_STRING } from "actions/types";

export default function (state = [], action) {

    switch(action.type) {

        case SAVE_SEARCH_STRING:
            return [action.payload]

        default: 
            return state;
    }
}