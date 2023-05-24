import {
  useFloating,
  autoUpdate,
  UseFloatingOptions,
  ReferenceType,
  FloatingPortal,
  useInteractions,
  useRole,
  useDismiss,
  arrow,
  FloatingArrow,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import React, { useRef } from "react";
import { styled } from "@storybook/theming";

interface TooltipProps extends Partial<UseFloatingOptions<ReferenceType>> {
  anchorElement: Element;
  /** Closes the floating element when a dismissal is requested — by default, when the user presses the escape key or outside of the floating element. */
  dismiss?: boolean;
  children: React.ReactNode;
}

const StyledTooltip = styled.div`
  padding: 4px;
  border: 1px solid black;
`;

const ARROW_HEIGHT = 7;
const GAP = 2;

export function Tooltip({
  anchorElement,
  children,
  ...tooltipOptions
}: TooltipProps) {
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    elements: {
      ...tooltipOptions.elements,
      reference: anchorElement,
    },
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      flip({
        crossAxis: false,
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
      ...(tooltipOptions.middleware ?? []),
    ],
    ...tooltipOptions,
  });

  const role = useRole(context, {
    role: "tooltip",
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([role, dismiss]);

  return tooltipOptions.open ? (
    <>
      <FloatingPortal>
        <StyledTooltip
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <FloatingArrow ref={arrowRef} context={context} />
          {children}
        </StyledTooltip>
      </FloatingPortal>
    </>
  ) : null;
}
