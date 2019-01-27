
import { LIKE_JOB, CLEAR_JOBS } from '../actions/types';
import _ from 'lodash';
const initialState = {

}

export default (state = [], { type, payload }) => {
    switch (type) {

        case LIKE_JOB:
            return _.unionBy([...state, payload], "id");
        case CLEAR_JOBS:
            return []

        default:
            return state
    }
}
