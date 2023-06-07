import { motion } from "framer-motion";
import { Fragment, forwardRef } from "react";
import { SnippetWrapper } from "./Snippet.styled";
import React from "react";
import { SyntaxHighlighter as StorybookSyntaxHighlighter } from "@storybook/components";
import { ThemeProvider, ensure, themes } from "@storybook/theming";

interface Props {
  contents: { content: string; toggle?: boolean }[];
  active: boolean;
  open?: boolean;
}

const wrapperVariants = {
  default: {
    filter: "grayscale(1)",
    opacity: 0.5,
  },
  active: {
    filter: "grayscale(0)",
    opacity: 1,
  },
};

export const Snippet = forwardRef<HTMLDivElement, Props>(
  ({ active, contents, open }, ref) => {
    return (
      <ThemeProvider theme={ensure(themes.dark)}>
        <SnippetWrapper
          ref={ref}
          initial="default"
          animate={active ? "active" : "default"}
          aria-hidden={!active}
          variants={wrapperVariants}
          transition={{ ease: "easeInOut", duration: 0.6 }}
        >
          {contents.map(({ toggle, content }, i) => (
            <Fragment key={i}>
              {toggle === undefined && (
                <StorybookSyntaxHighlighter
                  language="javascript"
                  customStyle={{ fontSize: "0.8rem" }}
                >
                  {content}
                </StorybookSyntaxHighlighter>
              )}

              {toggle && !open && (
                <StorybookSyntaxHighlighter
                  language="javascript"
                  customStyle={{ fontSize: "0.8rem" }}
                >
                  {`  // ...`}
                </StorybookSyntaxHighlighter>
              )}

              {toggle && open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <StorybookSyntaxHighlighter
                    language="javascript"
                    customStyle={{ fontSize: "0.8rem" }}
                    codeTagProps={{ style: { paddingLeft: "15px" } }}
                  >
                    {content}
                  </StorybookSyntaxHighlighter>
                </motion.div>
              )}
            </Fragment>
          ))}
        </SnippetWrapper>
      </ThemeProvider>
    );
  }
);
