import React from "react";

export const buttonStyles: React.ComponentProps<"button">["style"] = {
  border: 0,
  cursor: "pointer",
  fontSize: 13,
  lineHeight: 1,
  padding: "9px 12px",
  backgroundColor: "#029CFD",
  borderRadius: 4,
  color: "#fff",
  fontWeight: 700,
};

export function Button(props: React.ComponentProps<"button">) {
  const style = {
    ...buttonStyles,
    ...(props.style || {}),
  };

  return <button type="button" {...props} style={style} />;
}
