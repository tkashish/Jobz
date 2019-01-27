import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import JobsReducer from './JobsReducer';
import LikesReducers from './LikesReducers';

export default combineReducers({
    auth: AuthReducer,
    jobs: JobsReducer,
    likedJobs: LikesReducers
});