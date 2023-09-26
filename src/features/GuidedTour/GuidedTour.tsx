import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { API } from "@storybook/manager-api";
import { UPDATE_STORY_ARGS } from "@storybook/core-events";
import { useTheme } from "@storybook/theming";

import { PulsatingEffect } from "../../components/PulsatingEffect/PulsatingEffect";
import { Confetti } from "../../components/Confetti/Confetti";
import { Tooltip, TooltipProps } from "./Tooltip";
import { SpanHighlight } from "../WriteStoriesModal/WriteStoriesModal.styled";
import { CodeSnippets } from "../WriteStoriesModal/code/types";

type GuidedTourStep = TooltipProps["step"];

export function GuidedTour({
  api,
  isFinalStep,
  onFirstTourDone,
  onLastTourDone,
  codeSnippets,
}: {
  api: API;
  isFinalStep?: boolean;
  codeSnippets: CodeSnippets;
  onFirstTourDone: () => void;
  onLastTourDone: () => void;
}) {
  const [stepIndex, setStepIndex] = useState<number>();
  const theme = useTheme();

  useEffect(() => {
    api.once(UPDATE_STORY_ARGS, () => {
      setStepIndex(3);
    });
  }, []);

  const steps: GuidedTourStep[] = isFinalStep
    ? [
      {
        target: "#example-button--warning",
        title: "Congratulations!",
        content: (
          <>
            You just created your first story. Continue setting up your
            project to write stories for your own components.
          </>
        ),
        placement: "right",
        disableOverlay: true,
        disableBeacon: true,
        floaterProps: {
          disableAnimation: true,
        },
        onNextButtonClick() {
          onLastTourDone();
        },
      },
    ]
    : [
      {
        target: "#storybook-explorer-tree > div",
        title: "Storybook is built from stories",
        content: (
          <>
            Storybook stories represent the key states of each of your
            components.
            <br />
            <br />
            {codeSnippets?.filename && (
              <>
                We automatically added four stories for this Button component
                in this example file:
                <br />
                <SpanHighlight>{codeSnippets.filename}</SpanHighlight>
              </>
            )}
          </>
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
        title: "Storybook previews are interactive",
        content:
          "Whenever you modify code or stories, Storybook automatically updates how it previews your components.",
        placement: "bottom",
        styles: {
          spotlight: {
            borderRadius: 0,
          },
        },
      },
      {
        target: "#root > div",
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
          options: {
            preventOverflow: {
              boundariesElement: "window",
            },
          },
        },
        hideNextButton: true,
      },
      {
        target: "#control-primary",
        title: "Congratulations!",
        content: (
          <>
            You learned how to control your stories interactively. Now let's
            explore how to write your first story.
            <Confetti
              numberOfPieces={800}
              recycle={false}
              tweenDuration={20000}
            />
          </>
        ),
        placement: "right",
        floaterProps: {
          options: {
            preventOverflow: {
              boundariesElement: "window",
            },
          },
        },
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
        options: {
          offset: {
            offset: "0, 6",
          },
        },
        styles: {
          floater: {
            padding: 0,
            paddingLeft: 8,
            paddingTop: 8,
            filter:
              theme.base === "light"
                ? "drop-shadow(0px 5px 5px rgba(0,0,0,0.05)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))"
                : "drop-shadow(#fff5 0px 0px 0.5px) drop-shadow(#fff5 0px 0px 0.5px)",
          },
        },
      }}
      tooltipComponent={Tooltip}
      styles={{
        overlay: {
          mixBlendMode: "unset",
          backgroundColor: "none",
        },
        spotlight: {
          backgroundColor: "none",
          border: `solid 2px ${theme.color.secondary}`,
          boxShadow: "0px 0px 0px 9999px rgba(0,0,0,0.4)",
        },
        options: {
          zIndex: 10000,
          primaryColor: theme.color.secondary,
          arrowColor: theme.base === "dark" ? "#292A2C" : theme.color.lightest,
        },
      }}
    />
  );
}
