import React from "react";
import { DisplayConsoleItem as StyledDisplayConsoleItem } from "./styles";
const DisplayConsoleItem = ({ data }) => {
  return (
    <StyledDisplayConsoleItem>
      <pre>{JSON.stringify(data, null, 1)}</pre>
      <br />
    </StyledDisplayConsoleItem>
  );
};
export default DisplayConsoleItem;
