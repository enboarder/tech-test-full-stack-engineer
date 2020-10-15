import styled from "styled-components";
const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1024px",
};

const device = {
  mobileL: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const Application = styled.div`
  font-weight: 300;
  font-style: italic;
  display: flex;
  flex-flow: column;
  align-self: center;
  justify-content: center;

  svg,
  span {
    padding-left: 10px;
  }
  width: 100%;
  height: 100%;
  @media only screen and (orientation: portrait) {
    flex-flow: row;
  }
  @media only screen and ${device.desktop} {
    width: 50%;
    height: 50%;
  }
`;
export const Button = styled.button`
  border-radius: 5px;
  font-size: 1.25em;
  cursor: pointer;
  border-color: white;
  background-color: transparent;
  color: white;
  padding: 5px 10px;
  &:disabled {
    cursor: default;
  }
`;
export const BorderedPanel = styled.div`
  border: 1px solid white;

  @media only screen and ${device.desktop} {
    margin: 0 10px 10px;
  }
`;
export const ControlConsole = styled(BorderedPanel)`
  height: 33%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;

  > * {
    margin: 10px;
  }
  @media only screen and (orientation: portrait) {
    flex-flow: column;
    height: 100%;
    width: 33%;
  }
`;
export const Separator = styled.div`
  border-left: 1px solid white;
  margin: 0;
  height: auto;
  @media only screen and (orientation: portrait) {
    width: 100%;
    border-left: none;
    border-bottom: 1px solid white;
  }
  @media only screen and (orientation: landscape) {
    height: 100%;
    width: auto;
  }
  @media ${device.desktop} {
    height: 100%;
    width: auto;
  }
`;
export const LandingPad = styled.div`
  display: flex;
  align-items: center;

  input {
    font-size: 1em;
    line-height: 2;
    width: auto;

    @media only screen and (orientation: portrait) {
      width: 100%;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    @media only screen and (orientation: landscape) {
      width: auto;
      margin-bottom: 0px;
      margin-right: 30px;
    }
    @media ${device.desktop} {
      width: auto;
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
  @media only screen and (orientation: portrait) {
    flex-flow: column;
  }
  @media only screen and (orientation: landscape) {
    flex-flow: row;
  }
  @media ${device.desktop} {
    flex-flow: row;
  }
`;
export const DisplayConsoleItem = styled.div`
  pre  {
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
  border-bottom:1px solid white;
`;

export const DisplayConsole = styled(BorderedPanel)`
  overflow-y: auto;
  @media only screen and (orientation: portrait) {
    height: 100%;
    width: 67%;
  }
  @media only screen and (orientation: landscape) {
    height: 67%;
    padding: 10px;
  }
  @media only screen and (${device.desktop} or orientation: landscape) {
    height: 67%;
    padding: 10px;
  }
`;
