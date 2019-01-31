import { CURRENT_REGION } from '../actions/types';

export const updateCurrentRegion = (region) => {
    return {
        type: CURRENT_REGION,
        payload: region
    }
};