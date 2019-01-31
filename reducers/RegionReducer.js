
import { CURRENT_REGION } from '../actions/types';

export default (state = [], { type, payload }) => {
    switch (type) {

        case CURRENT_REGION:
            return payload;

        default:
            return state
    }
}
