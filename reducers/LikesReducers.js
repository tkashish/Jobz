
import { LIKE_JOB } from '../actions/types';
import _ from 'lodash';
const initialState = {

}

export default (state = [], { type, payload }) => {
    switch (type) {

        case LIKE_JOB:
            return _.unionBy([...state, payload], "id");

        default:
            return state
    }
}
