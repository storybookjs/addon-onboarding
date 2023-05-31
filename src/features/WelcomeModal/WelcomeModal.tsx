import { styled, keyframes } from "@storybook/theming";
import { Button } from "../../components/Button/Button";

import React from "react";
import { Modal } from "../../components/Modal/Modal";
import { StorybookLogo } from "../../components/Icons/StorybookLogo";

const rainbowAnimation = keyframes`
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

// @ts-ignore FIXME
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
` as any;

export const WelcomeModal = ({
  onSkip,
  onProceed,
}: {
  onSkip: () => void;
  onProceed: () => void;
}) => {
  return (
    <Modal width="540px" defaultOpen>
      {({ Title, Description, Close }) => (
        <ModalContentWrapper data-chromatic="ignore">
          <StorybookLogo />
          <Title style={{ marginTop: 20 }}>Welcome to Storybook</Title>
          <Description>
            Storybook helps you develop UI components.
            <br />
            Learn the basics in a few simple steps.
          </Description>
          <Button style={{ marginTop: 4 }} onClick={onProceed}>
            Start your 3 minute tour
          </Button>
          <Close style={{ marginTop: 90 }} onClick={onSkip}>
            Skip tour
          </Close>
        </ModalContentWrapper>
      )}
    </Modal>
  );
};
