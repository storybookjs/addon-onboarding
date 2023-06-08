import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider, ensure, themes } from "@storybook/theming";
import { STORY_CHANGED } from "@storybook/core-events";
import { addons, type API } from "@storybook/manager-api";

import { GuidedTour } from "./features/GuidedTour/GuidedTour";
import { WelcomeModal } from "./features/WelcomeModal/WelcomeModal";
import { WriteStoriesModal } from "./features/WriteStoriesModal/WriteStoriesModal";
import { Confetti } from "./components/Confetti/Confetti";
import { PulsatingEffect } from "./components/PulsatingEffect/PulsatingEffect";

type Step =
  | "1:Welcome"
  | "2:StorybookTour"
  | "3:WriteYourStory"
  | "4:VisitNewStory"
  | "5:ConfigureYourProject";

const theme = ensure(themes.light);

export default function App({ api }: { api: API }) {
  const [enabled, setEnabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [step, setStep] = useState<Step>("1:Welcome");

  const skipOnboarding = useCallback(() => {
    // remove onboarding query parameter from current url
    const url = new URL(window.location.href);
    const path = decodeURIComponent(url.searchParams.get("path"));
    url.search = `?path=${path}&onboarding=false`;
    history.replaceState({}, "", url.href);
    api.setQueryParams({ onboarding: "false" });
    setEnabled(false);
  }, [setEnabled, api]);

  useEffect(() => {
    let stepTimeout: number;
    if (step === "4:VisitNewStory") {
      setShowConfetti(true);
      stepTimeout = window.setTimeout(() => {
        setStep("5:ConfigureYourProject");
      }, 2000);
    }

    return () => {
      clearTimeout(stepTimeout);
    };
  }, [step]);

  useEffect(() => {
    const storyId = api.getCurrentStoryData()?.id;
    api.setQueryParams({ onboarding: "true" });
    // make sure the initial state is set correctly:
    // 1. Selected story is primary button
    // 2. The addon panel is opened, in the bottom and the controls tab is selected
    if (storyId !== "example-button--primary") {
      api.selectStory("example-button--primary", undefined, {
        ref: undefined,
      });
    }
  }, []);

  useEffect(() => {
    const onStoryChanged = (storyId: string) => {
      if (storyId === "configure-your-project--docs") {
        skipOnboarding();
      }
    };

    api.on(STORY_CHANGED, onStoryChanged);

    return () => {
      api.off(STORY_CHANGED, onStoryChanged);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {enabled && showConfetti && (
        <Confetti
          numberOfPieces={800}
          recycle={false}
          tweenDuration={20000}
          onConfettiComplete={(confetti) => {
            confetti.reset();
            setShowConfetti(false);
          }}
        />
      )}
      <WelcomeModal
        onProceed={() => setStep("2:StorybookTour")}
        isOpen={enabled && step === "1:Welcome"}
        skipOnboarding={skipOnboarding}
      />
      {enabled && (step === "2:StorybookTour" || step === "5:ConfigureYourProject") && (
        <GuidedTour
          api={api}
          isFinalStep={step === "5:ConfigureYourProject"}
          onFirstTourDone={() => {
            setStep("3:WriteYourStory");
          }}
        />
      )}
      <WriteStoriesModal
        api={api}
        addonsStore={addons}
        onFinish={() => {
          api.selectStory("example-button--warning");
          setStep("4:VisitNewStory");
        }}
        isOpen={enabled && step === "3:WriteYourStory"}
        skipOnboarding={skipOnboarding}
      />
    </ThemeProvider>
  );
}
