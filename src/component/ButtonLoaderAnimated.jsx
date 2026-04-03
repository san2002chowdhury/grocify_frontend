import React from "react";
import styled from "styled-components";

const StyledButtonLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  .loader {
    width: 18px;
    height: 18px;
    position: relative;
  }

  .loader:before {
    content: "";
    width: 18px;
    height: 3px;
    background: #71ac11;
    position: absolute;
    top: 22px;
    left: 0;
    border-radius: 50%;
    opacity: 0.4;
    animation: shadow324 0.5s linear infinite;
  }

  .loader:after {
    content: "";
    width: 100%;
    height: 100%;
    background: #71ac11;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(4px) rotate(22.5deg);
    }
    50% {
      transform: translateY(8px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 20px;
    }
    75% {
      transform: translateY(4px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #71ac11;
  }
`;

const ButtonLoaderAnimated = () => {
  return (
    <StyledButtonLoader>
      <div className="loader"></div>
      <span>Please wait...</span>
    </StyledButtonLoader>
  );
};

export default ButtonLoaderAnimated;
