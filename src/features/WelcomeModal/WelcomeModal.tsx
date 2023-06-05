import React from "react";

import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { StorybookLogo } from "../../components/Icons/StorybookLogo";
import {
  ModalContentWrapper,
  SkipButton,
  StyledIcon,
  Title,
  Description,
} from "./WelcomeModal.styled";

export const WelcomeModal = ({
  onSkip,
  onProceed,
}: {
  onSkip: () => void;
  onProceed: () => void;
}) => {
  return (
    <Modal width={540} defaultOpen>
      {({ Close }) => (
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
          <Close asChild>
            <SkipButton onClick={onSkip}>
              Skip tour
              <StyledIcon icon="arrowright" />
            </SkipButton>
          </Close>
        </ModalContentWrapper>
      )}
    </Modal>
  );
};
