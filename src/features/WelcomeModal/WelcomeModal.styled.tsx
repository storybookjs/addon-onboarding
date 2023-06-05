import { Icons } from "@storybook/components";
import { keyframes, styled } from "@storybook/theming";

export const Title = styled.h1`
  color: #2e3438;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #454e54;
`;

export const rainbowAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const ModalContentWrapper = styled.div`
  background: radial-gradient(
        circle at left,
        #ffccd2,
        #ffdbcb,
        #ffe9c5,
        #fff8c0,
        #f2ffd8,
        #d2f8e5,
        #b3f0f1,
        #a1e6f0,
        #9fd8df
      )
      left,
    radial-gradient(
        circle at right,
        #ffccd2,
        #ffdbcb,
        #ffe9c5,
        #fff8c0,
        #f2ffd8,
        #d2f8e5,
        #b3f0f1,
        #a1e6f0,
        #9fd8df
      )
      right,
    linear-gradient(
      45deg,
      #ffccd2,
      #ffdbcb,
      #ffe9c5,
      #fff8c0,
      #f2ffd8,
      #d2f8e5,
      #b3f0f1,
      #a1e6f0,
      #9fd8df
    );
  background-size: 300% 300%;
  background-repeat: no-repeat;
  animation: ${rainbowAnimation} 10s linear infinite;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 20px;
`;

export const StyledIcon = styled(Icons)`
  margin-left: 2px;
  height: 10px;
`;

export const SkipButton = styled.button`
  all: unset;
  margin-top: 90px;
  cursor: pointer;
  font-size: 13px;
  color: #798186;
  :focus-visible {
    outline: auto;
  }
`;
