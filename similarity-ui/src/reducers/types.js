import { SAVE_TYPES } from "actions/types";

export default function (state = [], action) {
    switch(action.type) {

        case SAVE_TYPES:
            return [action.payload]

        default: 
            return state;
    }
}