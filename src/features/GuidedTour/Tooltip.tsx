import React from "react";
import { styled } from "@storybook/theming";
import { TooltipRenderProps } from "react-joyride";
import { Button } from "../../components/Button/Button";

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

type TooltipProps = TooltipRenderProps & {
  step: TooltipRenderProps["step"] & { hideNextButton?: boolean };
};

export const Tooltip = ({ step, primaryProps, tooltipProps }: TooltipProps) => {
  return (
    <TooltipBody {...tooltipProps}>
      <Wrapper>
        {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
        <TooltipContent>{step.content}</TooltipContent>
      </Wrapper>
      {!step.hideNextButton && (
        <TooltipFooter id="buttonNext">
          <Button {...primaryProps}>Next</Button>
        </TooltipFooter>
      )}
    </TooltipBody>
  );
};
