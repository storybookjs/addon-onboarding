import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { PulsatingEffect } from "../../components/PulsatingEffect/PulsatingEffect";
import { Confetti } from "../../components/Confetti/Confetti";
import { API } from "@storybook/manager-api";
import { STORY_ARGS_UPDATED } from "@storybook/core-events";
import { Tooltip } from "./Tooltip";

type GuidedTourStep = Step & { hideNextButton?: boolean };

export function GuidedTour({
  api,
  isFinalStep,
  onFirstTourDone,
}: {
  api: API;
  isFinalStep?: boolean;
  onFirstTourDone: () => void;
}) {
  const [stepIndex, setStepIndex] = useState<number>();

  useEffect(() => {
    api.once(STORY_ARGS_UPDATED, () => {
      setStepIndex(3);
    });
  }, []);

  const steps: GuidedTourStep[] = isFinalStep
    ? [
        {
          target: "#configure-your-project--docs",
          title: "Continue setting up your project",
          content:
            "You nailed the basics. Now get started writing stories for your own components.",
          placement: "right",
          disableOverlay: true,
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          hideNextButton: true
        },
      ]
    : [
        {
          target: "#storybook-explorer-tree > div",
          title: "Storybook is built from stories",
          content:
            "Storybook uses stories to represent the key states supported by each of your components. For example: this Button component has four stories.",
          placement: "right",
          disableBeacon: true,
          styles: {
            spotlight: {
              transform: "translateY(30px)",
            },
          },
          floaterProps: {
            disableAnimation: true,
          },
        },
        {
          target: "#storybook-preview-iframe",
          title: "Storybook previews are interactive",
          content:
            "Whenever you modify code or stories, Storybook automatically updates how it previews your components.",
          placement: "bottom",
        },
        {
          target: "#root div[role=main]",
          title: "Interactive story playground",
          content: (
            <>
              See how a story renders with different data and state without
              touching code.
              <br />
              <br />
              Try it out by pressing this button.
              <PulsatingEffect targetSelector="#control-primary" />
            </>
          ),
          placement: "right",
          spotlightClicks: true,
          floaterProps: {
            target: "#control-primary",
          },
          hideNextButton: true
        },
        {
          target: "#control-primary",
          title: "Congratulations!",
          content: (
            <>
              You've learned how to control your stories interactively. Now:
              let's explore how to write your first story.
              <Confetti numberOfPieces={100} />
            </>
          ),
          placement: "right",
          disableOverlay: true,
        },
      ];

  return (
    <Joyride
      steps={steps}
      continuous
      stepIndex={stepIndex}
      spotlightPadding={0}
      hideBackButton
      disableCloseOnEsc
      disableOverlayClose
      disableScrolling
      hideCloseButton
      callback={(data: CallBackProps) => {
        if (!isFinalStep && data.status === STATUS.FINISHED) {
          onFirstTourDone();
        }
      }}
      floaterProps={{
        styles: {
          floater: {
            padding: 0,
            paddingLeft: 8,
            paddingTop: 8,
            filter:
              "drop-shadow(0px 5px 5px rgba(0,0,0,0.05)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))",
          },
        },
      }}
      tooltipComponent={Tooltip}
      styles={{
        spotlight: {
          border: "solid 2px #004c7c",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.48)",
        },
        options: {
          zIndex: 10000,
          primaryColor: "#029CFD",
        },
      }}
    />
  );
}
