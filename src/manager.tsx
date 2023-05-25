import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";

// Add a new DOM element to document.body, where we will bootstrap our React app
const domNode = document.createElement("div");

domNode.id = "addon-onboarding";
domNode.style.position = "absolute";
domNode.style.top = "0";
domNode.style.left = "0";
domNode.style.width = "0";
domNode.style.height = "0";
domNode.style.overflow = "hidden";
domNode.style.opacity = "0";
domNode.style.visibility = "hidden";

// Append the new DOM element to document.body
document.body.appendChild(domNode);

// Render the React app
ReactDOM.render(<App />, domNode);
