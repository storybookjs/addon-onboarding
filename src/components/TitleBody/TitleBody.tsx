import React from "react";
import { Body, Title, Wrapper } from "./TitleBody.styled";

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
