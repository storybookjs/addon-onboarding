import React, { styled } from "@storybook/theming";
import { Button } from "src/components/Button/Button";

const TooltipBody = styled.div`
  background: #fff;
  width: 240px;
`;
const TooltipTitle = styled.div``;
const TooltipContent = styled.div``;
const TooltipFooter = styled.div``;
const FormattedMessage = styled.div``;

export const Tooltip = ({ step, primaryProps, tooltipProps }) => (
  <TooltipBody {...tooltipProps}>
    {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
    <TooltipContent>{step.content}</TooltipContent>
    <TooltipFooter>
      <Button {...primaryProps}>
        <FormattedMessage id="next" />
      </Button>
    </TooltipFooter>
  </TooltipBody>
);
