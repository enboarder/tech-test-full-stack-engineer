import {
  FETCH_ALL_CAPSULES_SUCCESS,
  FETCH_ALL_CAPSULES_FAILURE,
  SHOW_INPROGRESS,
  FETCH_LANDING_PAD_FAILURE,
  FETCH_LANDING_PAD_SUCCESS,
} from "./spaceDataActionTypes";
const initialState = {
  allCapsules: [],
  isFetchingInProgress: false,
  isAllCapsulesFetchSuccess: false,
  isLandingPadFetchSuccess: true,
  isShowAllCapsulesMode: true,
  errorMessage: null,
  landingPad: null,
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SHOW_INPROGRESS:
      return { ...state, isFetchingInProgress: true, errorMessage: null };
    case FETCH_ALL_CAPSULES_SUCCESS:
      const allCapsules = payload;
      debugger;
      return {
        ...state,
        allCapsules,
        isShowAllCapsulesMode: true,
        isAllCapsulesFetchSuccess: true,
        isFetchingInProgress: false,
        errorMessage: null,
      };
    case FETCH_ALL_CAPSULES_FAILURE:
      return {
        ...state,
        allCapsules: [],
        isShowAllCapsulesMode: true,
        isAllCapsulesFetchSuccess: false,
        isFetchingInProgress: false,
        errorMessage: payload.errorMessage,
      };
    case FETCH_LANDING_PAD_SUCCESS:
      const landingPad = payload;
      console.log(landingPad);
      return {
        ...state,
        isLandingPadFetchSuccess: true,
        isShowAllCapsulesMode: false,
        landingPad,
        isFetchingInProgress: false,
      };
    case FETCH_LANDING_PAD_FAILURE:
      return {
        ...state,
        isLandingPadFetchSuccess: false,
        isShowAllCapsulesMode: false,
        landingPad: null,
        isFetchingInProgress: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
