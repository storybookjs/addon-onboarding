import React from "react";

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
    <div>
      {prefix}
      <strong style={{ fontSize: 14 }}>{title}</strong>
      <p style={{ fontSize: 14, color: "#798186", margin: 0, marginTop: 10 }}>
        {body}
      </p>
    </div>
  );
}
