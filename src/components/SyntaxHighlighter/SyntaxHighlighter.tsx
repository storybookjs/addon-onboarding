import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Backdrop, Code, Container } from "./SyntaxHighlighter.styled";
import { Snippet } from "./Snippet/Snippet";

type SyntaxHighlighterProps = {
  data: { code: string; toggle?: boolean }[][];
  activeStep: number;
  width: number;
};

type StepsProps = {
  yPos: number;
  backdropHeight: number;
  index: number;
  open: boolean;
};

const OFFSET = 49;

export const SyntaxHighlighter = ({
  activeStep,
  data,
  width,
}: SyntaxHighlighterProps) => {
  const [steps, setSteps] = useState<StepsProps[]>([]);

  const refs = useMemo(
    () => data.map(() => createRef<HTMLDivElement>()),
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
      const backdropHeight = refs[i].current!.getBoundingClientRect().height;
      const finalSteps = [
        {
          yPos: getYPos(i) + OFFSET - 7,
          backdropHeight,
          index: i,
          open: false,
        },
      ];

      if (content.length > 1) {
        finalSteps.push({
          yPos: getYPos(i) + OFFSET - 7,
          backdropHeight,
          index: i,
          open: true,
        });
      }

      return finalSteps;
    });

    setSteps(newSteps);
  }, [data]);

  useLayoutEffect(() => {
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
        animate={{ height: steps[activeStep]?.backdropHeight ?? 0 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        style={{ top: OFFSET }}
        className="syntax-highlighter-backdrop"
      />
    </Container>
  );
};
