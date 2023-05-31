import React from "react";
import { styled } from "@storybook/theming";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.strong`
  font-size: 13px;
`;

const Body = styled.p`
  font-size: 13px;
  text-align: start;
  color: #798186;
  margin: 0;
  margin-top: 4px;
`;

export function TitleBody({
  prefix,
  title,
  body,
}: {
  prefix?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <Wrapper>
      {prefix}
      <Title>{title}</Title>
      <Body>{body}</Body>
    </Wrapper>
  );
}
