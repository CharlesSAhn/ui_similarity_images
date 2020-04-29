import { UPDATE_WINDOW_WIDTH } from "actions/types";

export default function (state = null, action) {
    switch(action.type) {

        case UPDATE_WINDOW_WIDTH:
            return [action.payload]

        default: 
            return state;
    }
}