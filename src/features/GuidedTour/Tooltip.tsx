import { styled } from "@storybook/theming";
import React from "react";
import { Button } from "src/components/Button/Button";
import { TooltipRenderProps } from "react-joyride";

const TooltipBody = styled.div`
  background: #fff;
  width: 260px;
  padding: 15px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TooltipTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkest};
`;

const TooltipContent = styled.p`
  font-size: 13px;
  text-align: start;
  color: ${({ theme }) => theme.color.mediumdark};
  margin: 0;
  margin-top: 5px;
`;

const TooltipFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const Tooltip = ({
  step,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => {
  console.log(step);
  return (
    <TooltipBody {...tooltipProps}>
      <Wrapper>
        {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
        <TooltipContent>{step.content}</TooltipContent>
      </Wrapper>
      {(step.title !== "Interactive story playground" ||
        step.title !== "Continue setting up your project") && (
        <TooltipFooter id="buttonNext">
          <Button {...primaryProps}>Next</Button>
        </TooltipFooter>
      )}
    </TooltipBody>
  );
};
