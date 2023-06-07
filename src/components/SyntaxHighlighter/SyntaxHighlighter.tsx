import React, { useCallback, useEffect, useMemo } from "react";
import { Backdrop, Code, Container } from "./SyntaxHighlighter.styled";
import { Snippet } from "./Snippet/Snippet";

type SyntaxHighlighterProps = {
  data: { code: string; toggle?: boolean }[][];
  activeStep: number;
  width: number;
};

const OFFSET = 49;

export const SyntaxHighlighter = ({
  activeStep,
  data,
  width,
}: SyntaxHighlighterProps) => {
  const [steps, setSteps] = React.useState<
    { yPos: number; height: number; index: number; open: boolean }[]
  >([]);

  const refs = useMemo(
    () => data.map(() => React.createRef<HTMLDivElement>()),
    [data]
  );

  const getYPos = (idx: number) => {
    let yPos = 0;
    for (let i = 0; i < idx; i++) {
      yPos -= refs[i].current!.getBoundingClientRect().height;
    }
    return yPos;
  };

  const setNewSteps = useCallback(() => {
    const newSteps = data.flatMap((content, i) => {
      const height = refs[i].current!.getBoundingClientRect().height;
      const finalSteps = [
        {
          yPos: getYPos(i) + OFFSET - 7,
          height,
          index: i,
          open: false,
        },
      ];

      if (content.length > 1) {
        finalSteps.push({
          yPos: getYPos(i) + OFFSET - 7,
          height,
          index: i,
          open: true,
        });
      }

      return finalSteps;
    });

    setSteps(newSteps);
  }, [data]);

  useEffect(() => {
    // Call setNewSteps every time height of the refs elements changes
    const resizeObserver = new ResizeObserver(() => {
      setNewSteps();
    });

    refs.forEach((ref) => {
      resizeObserver.observe(ref.current!);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Container width={width}>
      <Code
        animate={{ y: steps[activeStep]?.yPos ?? 0 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
      >
        {data.map((content, idx: number) => (
          <Snippet
            key={idx}
            ref={refs[idx]}
            active={steps[activeStep]?.index === idx}
            open={
              steps[activeStep]?.index > idx
                ? true
                : steps[activeStep]?.open ?? false
            }
            content={content}
          />
        ))}
      </Code>
      <Backdrop
        animate={{ height: steps[activeStep]?.height ?? 0 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        style={{ top: OFFSET }}
        className="syntax-highlighter-backdrop"
      />
    </Container>
  );
};
