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

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

export const circle1Anim = keyframes`
  0% { transform: translate(0px, 0px) }
  50% { transform: translate(-200px, 0px) }
  100% { transform: translate(0px, 0px) }
`;

export const Circle1 = styled.div`
  position: absolute;
  width: 1200px;
  height: 1200px;
  left: -200px;
  top: -900px;
  background: radial-gradient(
    circle at center,
    rgba(253, 255, 147, 1) 0%,
    rgba(253, 255, 147, 0) 70%
  );
  animation: ${circle1Anim} 4s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 3;
`;

export const circle2Anim = keyframes`
  0% { transform: translate(0px, 0px) }
  50% { transform: translate(400px, 0px) }
  100% { transform: translate(0px, 0px) }
`;

export const Circle2 = styled.div`
  position: absolute;
  width: 1200px;
  height: 1200px;
  left: -600px;
  top: -840px;
  background: radial-gradient(
    circle at center,
    rgba(255, 119, 119, 1) 0%,
    rgba(255, 119, 119, 0) 70%
  );
  animation: ${circle2Anim} 6s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 2;
`;

export const circle3Anim = keyframes`
  0% { transform: translate(600px, -40px) }
  50% { transform: translate(600px, -200px) }
  100% { transform: translate(600px, -40px) }
`;

export const Circle3 = styled.div`
  position: absolute;
  width: 1200px;
  height: 1200px;
  left: -600px;
  top: -840px;
  background: radial-gradient(
    circle at center,
    rgba(119, 255, 247, 0.8) 0%,
    rgba(119, 255, 247, 0) 70%
  );
  animation: ${circle3Anim} 4s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 4;
`;

export const ModalContentWrapper = styled.div`
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
