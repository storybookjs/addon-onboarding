import { ThemeProvider, ensure, themes } from "@storybook/theming";

const theme = ensure(themes.light);

import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";
import {
  STORY_CHANGED,
  STORY_ARGS_UPDATED,
  SELECT_STORY,
} from "@storybook/core-events";

const TitleBody = ({
  prefix,
  title,
  body,
}: {
  prefix?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
}) => {
  return (
    <div>
      {prefix}
      <strong style={{ fontSize: 14 }}>{title}</strong>
      <p style={{ fontSize: 14, color: "#798186", margin: 0, marginTop: 10 }}>{body}</p>
    </div>
  );
};

let INTERACTIONS_COUNT = 0;
export const App = () => {
  const [shouldRun, setShouldRun] = useState<boolean>(true);
  const [channel, setChannel] = useState<any>();
  const [stepIndex, setStepIndex] = useState<number>();

  useEffect(() => {
    // TODO: Only get the channel once Storybook is available
    setTimeout(() => {
      // @ts-ignore
      const channelInstance = window?.__STORYBOOK_ADDONS_MANAGER?.getChannel();

      setChannel(channelInstance);
      channelInstance.emit(SELECT_STORY, {
        storyId: "example-button--primary",
      });

      // @ts-ignore
      document.querySelector("#tabbutton-addon-controls")?.click();
    }, 2000);
  }, []);

  useEffect(() => {
    if (channel) {
      channel.on(STORY_CHANGED, (storyId: string) => {
        if (storyId === 'introduction-configure-your-project--docs') {
          setShouldRun(false);
        }
      });

      channel.on(STORY_ARGS_UPDATED, () => {
        console.log("STORY_ARGS_UPDATED", { INTERACTIONS_COUNT });
        INTERACTIONS_COUNT = INTERACTIONS_COUNT + 1;
        if (INTERACTIONS_COUNT === 2) {
          setStepIndex(4);
        }
      });
    }
  }, [channel]);

  // Challenges
  // Do we need to remove autodocs from button component?
  // What if the addon panel is not open/visible?
  // What if the addon panel is in a bad placement?
  // HMR when testing the onboarding component
  // Setting up Storybook to the right state as it can be in different stories, addons, etc.
  // Defining proper selectors to the Storybook components (task in the monorepo)
  // Deal with Storybook channel updates
  // Detect new story (apparently there is no event for that!)

  const steps: Step[] = [
    {
      content: (
        <div style={{ width: '80%' }}>
          <h2>Welcome to Storybook</h2>
          <p>
            Storybook helps you develop UI components. Let's learn the basics in
            a few simple steps. It shouldn't take more than 3 minutes. Enjoy!
          </p>
        </div>
      ),
      locale: { skip: <span aria-label="skip">Skip onboarding</span> },
      placement: "center",
      target: "body",
      styles: {
        tooltip: {
          maxWidth: '100%',
          width: 500,
          height: 300
        },

      }
    },
    {
      target: ".sto-1qwztpk",
      content: (
        <TitleBody
          title="Your stories"
          body="A story is a key state of your UI component. This Button component
        has four stories."
        />
      ),
      placement: "right",
    },
    {
      target: "#storybook-preview-iframe",
      content: (
        <TitleBody
          title="Interactive story preview"
          body="Preview your stories here. Each time you modify a story, the changes will live update here."
        />
      ),
      placement: "bottom",
    },
    {
      target: "#control-primary",
      content: (
        <TitleBody
          title="Interactive story update"
          body="Update your story without having to change the code. Modify this boolean input a couple times to see how it changes the story."
        />
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
        <TitleBody
          prefix={<div style={{ fontSize: "50px" }}>🙌</div>}
          title="Great progress!"
          body="Now that you know how to control your stories interactively, let's dive deeper into how to create a story."
        />
      ),
      placement: "right",
      disableOverlay: true,
    },
    {
      target: "#introduction-configure-your-project--docs",
      content: (
        <TitleBody title="Configure the rest of your project"
          body="Click on your story to see the result." />
      ),
      placement: "right",
      disableOverlay: true,
      styles: {
        buttonNext: {
          display: "none",
        },
      }
    },
  ];

  return (

    <ThemeProvider theme={theme}>
      <Joyride
        steps={steps}
        continuous
        run={shouldRun}
        stepIndex={stepIndex}
        spotlightPadding={0}
        hideBackButton
        callback={(data) => console.log(data)}
        styles={{
          spotlight: {
            border: "solid 2px #004c7c",
          },
          tooltip: {
            maxWidth: 260
          },
          buttonNext: {
            backgroundColor: "#029CFD",
            width: "100%",
            padding: "12px 9px",
            margin: 0,
          },
          tooltipContent: {
            paddingBottom: 0
          },
          options: {
            zIndex: 10000,
          },
        }}
      />
    </ThemeProvider>
  );
};