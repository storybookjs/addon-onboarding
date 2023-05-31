import {
  ThemeProvider,
  ensure,
  themes,
  styled,
  keyframes,
} from "@storybook/theming";
import { Button } from "@storybook/components";
import { type API } from "@storybook/manager-api";

const theme = ensure(themes.light);

import React, { useEffect, useState } from "react";
import { STORY_CHANGED, CURRENT_STORY_WAS_SET } from "@storybook/core-events";
import { GuidedTour } from "./components/GuidedTour/GuidedTour";
import { Modal } from "./components/Modal/Modal";
import { StorybookLogo } from "./components/Icons/StorybookLogo";

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

// Styled component for the card
const ModalContentWrapper = styled.div`
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

export const App = ({ api }: { api: API }) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [showGuidedTour, setShowGuidedTour] = useState<boolean>(false);

  const skipTour = () => {
    // remove onboarding query parameter from current url
    const url = new URL(window.location.href);
    url.searchParams.delete("onboarding");
    const path = decodeURIComponent(url.searchParams.get("path"));
    url.search = `?path=${path}`;
    history.replaceState({}, "", url.href);
    setEnabled(false);
  };

  useEffect(() => {
    api.once(CURRENT_STORY_WAS_SET, ({ storyId }) => {
      // make sure the initial state is set correctly:
      // 1. Selected story is primary button
      // 2. The addon panel is opened, in the bottom and the controls tab is selected
      if (storyId !== "example-button--primary") {
        api.selectStory("example-button--primary", undefined, {
          ref: undefined,
        });
      }
      api.togglePanel(true);
      api.togglePanelPosition("bottom");
      api.setSelectedPanel("addon-controls");
    });
  }, []);

  useEffect(() => {
    api.on(STORY_CHANGED, (storyId: string) => {
      if (storyId === "introduction-configure-your-project--docs") {
        setEnabled(false);
      }
    });
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      {!showGuidedTour && (
        <Modal width="540px" defaultOpen>
          {({ Title, Description, Close }) => (
            <ModalContentWrapper>
              <StorybookLogo />
              <Title style={{ marginTop: 20 }}>Welcome to Storybook</Title>
              <Description>
                Storybook helps you develop UI components.
                <br />
                Learn the basics in a few simple steps.
              </Description>
              <Button
                style={{ marginTop: 4 }}
                secondary
                onClick={() => setShowGuidedTour(true)}
              >
                Start 3 minute tour
              </Button>
              <Close style={{ marginTop: 90 }} onClick={skipTour}>
                Skip tour
              </Close>
            </ModalContentWrapper>
          )}
        </Modal>
      )}
      {showGuidedTour && <GuidedTour api={api} />}
    </ThemeProvider>
  );
};
