import { ThemeProvider, ensure, themes } from "@storybook/theming";
import { type API } from "@storybook/manager-api";

const theme = ensure(themes.light);

import React, { useCallback, useEffect, useState } from "react";
import { STORY_CHANGED, CURRENT_STORY_WAS_SET } from "@storybook/core-events";
import { GuidedTour } from "./features/GuidedTour/GuidedTour";
import { WelcomeModal } from "./features/WelcomeModal/WelcomeModal";
import { WriteStoriesModal } from "./features/WriteStoriesModal/WriteStoriesModal";

type Step = "1:Welcome" | "2:StorybookTour" | "3:WriteYourStory" | "4:ConfigureYourProject"

export default function App({ api }: { api: API }) {
  const [enabled, setEnabled] = useState(true);
  const [step, setStep] = useState<Step>("1:Welcome");

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
      if (storyId === "configure-your-project--docs") {
        skipTour();
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
      {step === '1:Welcome' && (
        <WelcomeModal
          onProceed={() => {
            setStep('2:StorybookTour')
          }}
          onSkip={skipTour}
        />
      )}
      {(step === '2:StorybookTour' || step === '4:ConfigureYourProject') && (
        <GuidedTour
          api={api}
          isFinalStep={step === '4:ConfigureYourProject'}
          onFirstTourDone={() => {
            setStep('3:WriteYourStory')
          }}
        />
      )}
      {step === '3:WriteYourStory' && (
        <WriteStoriesModal
          onFinish={() => {
            setStep('4:ConfigureYourProject')
          }}
        />
      )}
    </ThemeProvider>
  );
};
