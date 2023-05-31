import { ThemeProvider, ensure, themes } from "@storybook/theming";
import { type API } from "@storybook/manager-api";

const theme = ensure(themes.light);

import React, { useCallback, useEffect, useState } from "react";
import { STORY_CHANGED, CURRENT_STORY_WAS_SET } from "@storybook/core-events";
import { GuidedTour } from "./features/GuidedTour/GuidedTour";
import { WelcomeModal } from "./features/WelcomeModal/WelcomeModal";
import { WriteStoriesModal } from "./features/WriteStoriesModal/WriteStoriesModal";

export const App = ({ api }: { api: API }) => {
  const [enabled, setEnabled] = useState(true);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [showWriteStoriesModal, setShowWriteStoriesModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isFinalStep, setIsFinalStep] = useState(false);

  const skipTour = useCallback(() => {
    // remove onboarding query parameter from current url
    const url = new URL(window.location.href);
    url.searchParams.delete("onboarding");
    const path = decodeURIComponent(url.searchParams.get("path"));
    url.search = `?path=${path}`;
    history.replaceState({}, "", url.href);
    setEnabled(false);
  }, [setEnabled]);

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
    const onStoryChanged = (storyId: string) => {
      if (storyId === "introduction-configure-your-project--docs") {
        setEnabled(false);
      }
    };

    api.on(STORY_CHANGED, onStoryChanged);

    return () => {
      api.off(STORY_CHANGED, onStoryChanged);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      {showGuidedTour && (
        <GuidedTour
          api={api}
          isFinalStep={isFinalStep}
          onFirstTourDone={() => {
            setShowWriteStoriesModal(true);
            setShowGuidedTour(false);
          }}
        />
      )}
      {showWelcomeModal && (
        <WelcomeModal
          onProceed={() => {
            setShowWelcomeModal(false);
            setShowGuidedTour(true);
          }}
          onSkip={skipTour}
        />
      )}
      {showWriteStoriesModal && (
        <WriteStoriesModal
          onFinish={() => {
            setShowWriteStoriesModal(false);
            setIsFinalStep(true);
            setShowGuidedTour(true);
          }}
        />
      )}
    </ThemeProvider>
  );
};
