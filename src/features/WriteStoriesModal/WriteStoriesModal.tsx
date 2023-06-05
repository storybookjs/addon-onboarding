import React from "react";
import { Button } from "../../components/Button/Button";

import { Modal } from "../../components/Modal/Modal";
import { Icons } from "@storybook/components";
import {
  Description,
  Header,
  Image,
  Main,
  ModalContent,
  SpanHighlight,
} from "./WriteStoriesModal.styled";
import { SyntaxHighlighter } from "../../components/SyntaxHighlighter/SyntaxHighlighter";
import { List } from "../../components/List/List";
import { ListItem } from "../../components/List/ListItem/ListItem";
import { useGetButtonPath } from "./hooks/useGetButtonPath";
import { useGetWarningButtonStatus } from "./hooks/useGetWarningButtonStatus";
import { useGetBackdropBoundary } from "./hooks/useGetBackdropBoundary";
import titleSidebarImg from "./assets/01-title-sidebar.png";
import storyNameSidebarImg from "./assets/02-story-name-sidebar.png";
import argsImg from "./assets/03-args.png";

import dataJavascript from "./code/javascript";
import dataTypescript from "./code/typescript";
import dataTypescriptNextjs from "./code/nextjs-typescript";
import { useGetProject } from "./hooks/useGetFrameworkName";
import { API, AddonStore } from "@storybook/manager-api";

export function WriteStoriesModal({
  onFinish,
  api,
  addonsStore,
}: {
  onFinish: () => void;
  api: API;
  addonsStore: AddonStore;
}) {
  const [step, setStep] = React.useState<
    "imports" | "meta" | "story" | "args" | "customStory"
  >("imports");

  const [isWarningStoryCopied, setWarningStoryCopied] = React.useState(false);

  const buttonPath = useGetButtonPath();
  const doesWarningButtonExist = useGetWarningButtonStatus(
    step === "customStory",
    api,
    addonsStore
  );
  const backdropBoundary = useGetBackdropBoundary(
    "syntax-highlighter-backdrop",
    step === "customStory"
  );

  const project = useGetProject();
  const isJavascript = project?.data?.language === "javascript";

  const data = isJavascript
    ? dataJavascript
    : project?.data?.framework.name === "@storybook/nextjs"
    ? dataTypescriptNextjs
    : dataTypescript;

  const copyWarningStory = () => {
    const warningContent = data[4][0].content;
    navigator.clipboard.writeText(
      warningContent.replace("// Copy the code below", "")
    );
    setWarningStoryCopied(true);
  };

  return (
    <Modal width={738} defaultOpen>
      {({ Title, Description: DefaultDescription, Close }) => (
        <ModalContent>
          <div style={{ maxHeight: "450px" }}>
            {data ? (
              <SyntaxHighlighter
                activeStep={
                  step === "imports"
                    ? 1
                    : step === "meta"
                    ? 2
                    : step === "story"
                    ? 3
                    : step === "args"
                    ? 4
                    : step === "customStory"
                    ? 5
                    : 1
                }
                contents={data}
                width="445px"
              />
            ) : (
              <div>loading...</div>
            )}
            {backdropBoundary && !doesWarningButtonExist?.data && (
              <Button
                onClick={() => {
                  copyWarningStory();
                }}
                style={{
                  position: "absolute",
                  top: backdropBoundary.top + backdropBoundary.height - 45,
                  left:
                    backdropBoundary.left +
                    backdropBoundary.width -
                    (isWarningStoryCopied ? 115 : 100),
                  zIndex: 1000,
                }}
              >
                {isWarningStoryCopied ? <>Code copied </> : "Copy code"}
              </Button>
            )}
          </div>
          <Main>
            <Header>
              <Title>
                <Icons icon="bookmarkhollow" />{" "}
                <span>How to write a story</span>
              </Title>
              <Close asChild>
                <Icons style={{ cursor: "pointer" }} icon="closeAlt" />
              </Close>
            </Header>
            <DefaultDescription asChild>
              <Description>
                {step === "imports" && (
                  <>
                    <div>
                      <h3>Imports</h3>
                      <p>
                        First, import Meta and StoryObj for type safety and
                        autocompletion in TypeScript stories.
                      </p>
                      <p>
                        Next, import a component. In this case, the Button
                        component.
                      </p>
                    </div>
                    <Button
                      style={{ marginTop: 4 }}
                      onClick={() => {
                        setStep("meta");
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}
                {step === "meta" && (
                  <>
                    <div>
                      <h3>Meta</h3>
                      <p>
                        The default export, Meta, contains metadata about this
                        component's stories. The title field controls where
                        stories appear in the sidebar.
                      </p>
                      <Image width="204" src={titleSidebarImg} />
                    </div>
                    <Button
                      style={{ marginTop: 4 }}
                      onClick={() => {
                        setStep("story");
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}
                {step === "story" && (
                  <>
                    <div>
                      <h3>Story</h3>
                      <p>
                        Each named export is a story. Its contents specify how
                        the story is rendered in addition to other configuration
                        options.
                      </p>
                      <Image width="190" src={storyNameSidebarImg} />
                    </div>
                    <Button
                      style={{ marginTop: 4 }}
                      onClick={() => {
                        setStep("args");
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}
                {step === "args" && (
                  <>
                    <div>
                      <h3>Args</h3>
                      <p>
                        Args are inputs that are passed to the component, which
                        Storybook uses to render the component in different
                        states. In React, args = props. They also specify the
                        initial control settings for the story.
                      </p>
                      <Image width="253" src={argsImg} />
                    </div>
                    <Button
                      style={{ marginTop: 4 }}
                      onClick={() => {
                        setStep("customStory");
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}
                {step === "customStory" &&
                  (!doesWarningButtonExist?.error ? (
                    <>
                      <div>
                        <h3>Create your first story</h3>
                        <p>
                          Now it's your turn. See how easy it is to create your
                          first story by following these steps below.
                        </p>
                        <List>
                          <ListItem
                            isCompleted={
                              isWarningStoryCopied ||
                              doesWarningButtonExist?.data
                            }
                            index={1}
                          >
                            Copy the Warning story
                          </ListItem>
                          <ListItem
                            isCompleted={doesWarningButtonExist?.data}
                            index={2}
                          >
                            Open{" "}
                            {buttonPath?.data ? (
                              <SpanHighlight>{buttonPath.data}</SpanHighlight>
                            ) : (
                              <>the Button Story</>
                            )}{" "}
                            in your current working directory
                          </ListItem>
                          <ListItem
                            isCompleted={doesWarningButtonExist?.data}
                            index={3}
                          >
                            Paste it at the bottom of the file
                          </ListItem>
                        </List>
                      </div>
                      {doesWarningButtonExist?.data ? (
                        <Button
                          onClick={() => {
                            onFinish();
                          }}
                        >
                          Go to story
                        </Button>
                      ) : null}
                    </>
                  ) : null)}
              </Description>
            </DefaultDescription>
          </Main>
        </ModalContent>
      )}
    </Modal>
  );
}
