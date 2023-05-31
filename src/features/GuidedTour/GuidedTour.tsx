import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { PulsatingEffect } from "../../components/PulsatingEffect/PulsatingEffect";
import { Confetti } from "../../components/Confetti/Confetti";
import { TitleBody } from "../../components/TitleBody/TitleBody";
import { API } from "@storybook/manager-api";
import { STORY_ARGS_UPDATED } from "@storybook/core-events";
import { buttonStyles } from "src/components/Button/Button";

let INTERACTIONS_COUNT = 0;

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
    api.on(STORY_ARGS_UPDATED, () => {
      INTERACTIONS_COUNT = INTERACTIONS_COUNT + 1;
      if (INTERACTIONS_COUNT === 2) {
        setStepIndex(3);
      }
    });
  }, []);

  const steps: Step[] = isFinalStep
    ? [
        {
          target: "#introduction-configure-your-project--docs",
          content: (
            <TitleBody
              title="Continue setting up your project"
              body="You nailed the basics. Now get started writing stories for your own components."
            />
          ),
          placement: "right",
          disableOverlay: true,
          disableBeacon: true,
          styles: {
            buttonNext: {
              display: "none",
            },
          },
          floaterProps: {
            disableAnimation: true,
          },
        },
      ]
    : [
        {
          target: "#storybook-explorer-tree > div",
          content: (
            <TitleBody
              title="Your stories"
              body="A story is a key state that a component supports. This Button component
        has four stories."
            />
          ),
          placement: "right",
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
        },
        {
          target: "#storybook-preview-iframe",
          content: (
            <TitleBody
              title="Interactive story preview"
              body="Whenever you modify a component's code or story, the changes will live update here."
            />
          ),
          placement: "bottom",
        },
        {
          target: "#control-primary",
          content: (
            <>
              <TitleBody
                title="Interactive story playground"
                body={
                  <>
                    See how a story renders with different data and state
                    without touching code.
                    <br />
                    Press this button a couple times to try it out.
                  </>
                }
              />
              <PulsatingEffect targetSelector="#control-primary" />
            </>
          ),
          placement: "right",
          spotlightPadding: 5,
          spotlightClicks: true,
          disableOverlay: true,
          styles: {
            buttonNext: {
              display: "none",
            },
            spotlight: {
              borderRadius: 200,
            },
          },
        },
        {
          target: "#control-primary",
          content: (
            <>
              <Confetti numberOfPieces={100} />
              <TitleBody
                title="Nice one!"
                body="Now you know how to control your stories interactively. Let's see how to write a story."
              />
            </>
          ),
          placement: "right",
          disableOverlay: true,
          locale: {
            last: "Next",
          },
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
      styles={{
        spotlight: {
          border: "solid 2px #004c7c",
        },
        tooltip: {
          maxWidth: 260,
        },
        buttonNext: buttonStyles,
        tooltipContent: {
          paddingBottom: 0,
        },
        options: {
          zIndex: 10000,
          primaryColor: "#029CFD",
        },
      }}
    />
  );
}
