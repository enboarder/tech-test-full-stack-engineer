import axios from "axios";
import { ServiceEnpoint } from "../../apiConstant";
import {
  FETCH_ALL_CAPSULES_SUCCESS,
  FETCH_ALL_CAPSULES_FAILURE,
  SHOW_INPROGRESS,
  FETCH_LANDING_PAD_SUCCESS,
  FETCH_LANDING_PAD_FAILURE,
} from "./spaceDataActionTypes";
const showInProgress = () => ({
  type: SHOW_INPROGRESS,
});
const fetchAllCapsulesSuccess = (capsules) => ({
  type: FETCH_ALL_CAPSULES_SUCCESS,
  payload: capsules,
});
const fetchAllCapsulesFailure = (errorMessage) => ({
  type: FETCH_ALL_CAPSULES_FAILURE,
  payload: { errorMessage },
});

const fetchLandingPadSuccess = (landingPad) => ({
  type: FETCH_LANDING_PAD_SUCCESS,
  payload: landingPad,
});

const fetchLandingPadFailure = (errorMessage) => ({
  type: FETCH_LANDING_PAD_FAILURE,
  payload: { errorMessage },
});
export const fetchLandingPad = (landingPadId) => async (dispatch) => {
  try {
    dispatch(showInProgress());
    const landingPad = await axios.get(
      `${ServiceEnpoint.LANDING_PAD}/${landingPadId}`
    );
    dispatch(fetchLandingPadSuccess(landingPad));
  } catch (error) {
    dispatch(fetchLandingPadFailure(error.message));
  }
};

export const fetchAllCapsules = () => async (dispatch) => {
  try {
    dispatch(showInProgress());

    const response = await axios.get(ServiceEnpoint.ALL_CAPSULES);
    
    const capsules = response.data;
    
    dispatch(fetchAllCapsulesSuccess(capsules));
  } catch (error) {
    dispatch(fetchAllCapsulesFailure(error.message));
  }
};
