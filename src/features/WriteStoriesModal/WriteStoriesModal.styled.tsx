import { keyframes, styled } from "@storybook/theming";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 85vh;

  &:focus-visible {
    outline: none;
  }
`;

export const Main = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.fonts.base};
`;

export const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.appBorderColor};
  height: 40px;
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.darkest};

  span {
    margin-top: 2px;
  }
`;

export const Content = styled.div`
  font-size: 13px;
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.darker};

  h3 {
    font-size: 13px;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
`;

export const SpanHighlight = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  display: inline-block;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  opacity: 0.8;
  background-color: ${({ theme }) => theme.color.secondary}20;
  font-weight: bold;
`;

export const Image = styled.img`
  max-width: 100%;
  margin-top: 1em;
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
  50% { transform: translate(120px, 0px) }
  100% { transform: translate(0px, 0px) }
`;

export const Circle1 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  left: -160px;
  top: -260px;
  background: radial-gradient(
    circle at center,
    rgba(255, 119, 119, 1) 0%,
    rgba(255, 119, 119, 0) 70%
  );
  animation: ${circle1Anim} 8s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 2;
`;

export const circle2Anim = keyframes`
  0% { transform: translate(0px, 0px) }
  33% { transform: translate(-64px, 0px) }
  66% { transform: translate(120px, 0px) }
  100% { transform: translate(0px, 0px) }
`;

export const Circle2 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  left: -54px;
  top: -250px;
  background: radial-gradient(
    circle at center,
    rgba(253, 255, 147, 1) 0%,
    rgba(253, 255, 147, 0) 70%
  );
  animation: ${circle2Anim} 12s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 3;
`;

export const circle3Anim = keyframes`
  0% { transform: translate(0px, 0px) }
  50% { transform: translate(-120px, 0px) }
  100% { transform: translate(0px, 0px) }
`;

export const Circle3 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  left: 150px;
  top: -220px;
  background: radial-gradient(
    circle at center,
    rgba(119, 255, 247, 0.8) 0%,
    rgba(119, 255, 247, 0) 70%
  );
  animation: ${circle3Anim} 4s linear infinite;
  animation-timing-function: ease-in-out;
  z-index: 4;
`;

export const ButtonsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 4px;
`;
