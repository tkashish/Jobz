import { CURRENT_REGION } from '../actions/types';

export const updateCurrentRegion = (region) => {
    console.log("updateCurrentRegion");
    console.log(region);
    return {
        type: CURRENT_REGION,
        payload: region
    }
};