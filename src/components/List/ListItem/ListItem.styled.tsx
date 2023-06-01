import { styled } from "@storybook/theming";

export const ListItemWrapper = styled.li(() => ({
  display: "flex",
  alignItems: "flex-start",
  columnGap: 12,
}));

export const ListItemContentWrapper = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  color: theme.color.darker,
  fontSize: "13px",
}));

export const ListItemIndexWrapper = styled.div<{ isCompleted: boolean }>(
  ({ isCompleted, theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: !isCompleted && `1px solid ${theme.color.medium}`,
    minWidth: 20,
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: isCompleted ? theme.color.green : "white",
    fontFamily: theme.typography.fonts.base,
    fontSize: 10,
    fontWeight: 600,
    color: theme.color.dark,
  })
);
