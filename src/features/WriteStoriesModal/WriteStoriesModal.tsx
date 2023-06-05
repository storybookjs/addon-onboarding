import React from "react";
import { Button } from "../../components/Button/Button";

import { Modal } from "../../components/Modal/Modal";
import { StorybookLogo } from "../../components/Icons/StorybookLogo";
import { ModalContentWrapper } from "../WelcomeModal/WelcomeModal.styled";

export function WriteStoriesModal({ onFinish }: { onFinish: () => void }) {
  return (
    <Modal width={540} defaultOpen>
      {({ Title, Description }) => (
        <ModalContentWrapper data-chromatic="ignore">
          <StorybookLogo />
          <Title style={{ marginTop: 20 }}>
            Create your first story (WORK IN PROGRESS)
          </Title>
          <Description>
            Now it's your turn. <br />
            See how easy it is to create your first story by following these
            steps below.
          </Description>
          <Button style={{ marginTop: 4 }} onClick={onFinish}>
            Go to story
          </Button>
        </ModalContentWrapper>
      )}
    </Modal>
  );
}
