import { Button, LandingPad as StyledComponent } from "./styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLandingPad } from "../redux/spaceData/spaceDataActions";

const LandingPad = () => {
  const [isLauchEnabled, setIsLandingEnabled] = useState(false);
  const [landingPadText, setLandingPadText] = useState("");
  const dispatch = useDispatch();
  const onLandingPadTextChanged = ({ target }) => {
    const { value } = target;
    setLandingPadText(value);
    const isValid = RegExp("^[^&%$#]+$").test(value);
    setIsLandingEnabled(isValid);
  };
  const onLandingClicked = () => {
    dispatch(fetchLandingPad(landingPadText));
  };
  return (
    <StyledComponent>
      <input onChange={onLandingPadTextChanged} maxLength="15" />
      <Button disabled={!isLauchEnabled} onClick={onLandingClicked}>
        Landing Pad
      </Button>
    </StyledComponent>
  );
};
export default LandingPad;
