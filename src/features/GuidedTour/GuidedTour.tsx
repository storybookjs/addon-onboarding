import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { PulsatingEffect } from "../../components/PulsatingEffect/PulsatingEffect";
import { Confetti } from "../../components/Confetti/Confetti";
import { TitleBody } from "../../components/TitleBody/TitleBody";
import { API } from "@storybook/manager-api";
import { STORY_ARGS_UPDATED } from "@storybook/core-events";
import { useTheme } from "@storybook/theming";
import { getStyles } from "./GuidedTour.styled";
import { Tooltip } from "./Tooltip";

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
  const theme = useTheme();

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
          target: "#configure-your-project--docs",
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
              title="Storybook is built from stories"
              body="Storybook uses stories to represent the key states supported by each of your components. For example: this Button component has four stories."
            />
          ),
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
          content: (
            <TitleBody
              title="Storybook previews are interactive"
              body="Whenever you modify code or stories, Storybook automatically updates how it previews your components."
            />
          ),
          placement: "bottom",
        },
        {
          target: "#root div[role=main]",
          content: (
            <>
              <TitleBody
                title="Interactive story playground"
                body={
                  <>
                    See how a story renders with different data and state
                    without touching code.
                    <br />
                    Try it out by pressing this button.
                  </>
                }
              />
              <PulsatingEffect targetSelector="#control-primary" />
            </>
          ),
          placement: "right",
          spotlightClicks: true,
          floaterProps: {
            target: "#control-primary",
          },
          styles: {
            buttonNext: {
              display: "none",
            },
          },
        },
        {
          target: "#control-primary",
          content: (
            <>
              <Confetti numberOfPieces={100} />
              <TitleBody
                title="Congratulations!"
                body="You've learned how to control your stories interactively. Now: let's explore how to write your first story."
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
      // tooltipComponent={Tooltip}
      styles={{
        spotlight: {
          border: "solid 2px #004c7c",
        },
        tooltip: {
          maxWidth: 260,
          borderRadius: 4,
          padding: 15,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.48)",
        },
        buttonNext: {
          ...getStyles(theme),
          marginTop: 5,
        },
        tooltipContent: {
          paddingTop: 4,
          padding: 0,
        },
        options: {
          zIndex: 10000,
          primaryColor: "#029CFD",
        },
      }}
    />
  );
}
