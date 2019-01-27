
import { CURRENT_REGION } from '../actions/types';

export default (state = [], { type, payload }) => {
    console.log("RegionReducer");
    console.log(payload);
    
    switch (type) {

        case CURRENT_REGION:
            return payload;

        default:
            return state
    }
}
