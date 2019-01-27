import axios from 'axios';
import qs from 'qs';
import Geocoder from 'react-native-geocoding';
import { FETCH_JOBS, LIKE_JOB } from './types';
import { store } from '../store';

const GITHUB_JOBS_ROOT_API = 'https://jobs.github.com/positions.json';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAQjzSNxlUQ0kTwwB_eLe7ItDNSYme4tkM'


const buildJobsUrl = (zip) => {
    params = qs.stringify({ location: zip });
    return `${GITHUB_JOBS_ROOT_API}?${params}`
}
Geocoder.init(GOOGLE_MAPS_API_KEY)

const updateJobsWithLatAndLng = async (jobs) => {
    return await Promise.all(jobs.map(j => updateJob(j)));
}

const updateJob = async (job) => {
    const result = await Geocoder.from(job.location)
    const l = result.results[0].geometry.location
    return {
        ...job,
        ...l
    }
}

export const fetchJobs = (navigate) => async dispatch => {
    try {
        // console.log(store.getState().region);
        const {latitude, longitude} = store.getState().region;
        let result = await Geocoder.from({ latitude, longitude });
        if (!result.results[0] || !result.results[0].address_components[6]) {
            console.log('cannot find location');
            console.log(result.results[0].address_components[6]);

            return;
        }
        let zip = result.results[0].address_components[6].long_name;
        url = buildJobsUrl(zip);
        let { data } = await axios.get(url);
        let jobs = await updateJobsWithLatAndLng(data)
        dispatch({
            type: FETCH_JOBS,
            payload: jobs
        })
        navigate('deck')
    } catch (error) {
        console.log(error);
    }
};

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

