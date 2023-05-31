import { ThemeProvider, ensure, themes } from "@storybook/theming";
import { type API } from "@storybook/manager-api";

const theme = ensure(themes.light);

import React, { useCallback, useEffect, useState } from "react";
import { STORY_CHANGED, CURRENT_STORY_WAS_SET } from "@storybook/core-events";
import { GuidedTour } from "./features/GuidedTour/GuidedTour";
import { WelcomeModal } from "./features/WelcomeModal/WelcomeModal";
import { WriteStoriesModal } from "./features/WriteStoriesModal/WriteStoriesModal";
import { Confetti } from "./components/Confetti/Confetti";

type Step =
  | "1:Welcome"
  | "2:StorybookTour"
  | "3:WriteYourStory"
  | "4:VisitNewStory"
  | "5:ConfigureYourProject";

export default function App({ api }: { api: API }) {
  const [enabled, setEnabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
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
    let stepTimeout: NodeJS.Timeout;
    let confettiTimeout: NodeJS.Timeout;
    if (step === "4:VisitNewStory") {
      stepTimeout = setTimeout(() => {
        setShowConfetti(true);
        setStep("5:ConfigureYourProject");
      }, 2000);
    }

    return () => {
      clearTimeout(stepTimeout);
      clearTimeout(confettiTimeout);
    };
  }, [step]);

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
      {showConfetti && (
        <Confetti
          numberOfPieces={1000}
          initialVelocityY={3}
          recycle={false}
          onConfettiComplete={(confetti) => {
            confetti.reset();
            setShowConfetti(false);
          }}
        />
      )}
      {step === "1:Welcome" && (
        <WelcomeModal
          onProceed={() => {
            setStep("2:StorybookTour");
          }}
          onSkip={skipTour}
        />
      )}
      {(step === "2:StorybookTour" || step === "5:ConfigureYourProject") && (
        <GuidedTour
          api={api}
          isFinalStep={step === "5:ConfigureYourProject"}
          onFirstTourDone={() => {
            setStep("3:WriteYourStory");
          }}
        />
      )}
      {step === "3:WriteYourStory" && (
        <WriteStoriesModal
          onFinish={() => {
            // TODO: enable this
            // api.selectStory("example-button--warning");
            setStep("4:VisitNewStory");
          }}
        />
      )}
    </ThemeProvider>
  );
}
