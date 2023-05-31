import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";
import { addons } from "@storybook/manager-api";

const isDevMode = process.env.NODE_ENV !== "production";

// The addon is enabled only when:
// 1. In dev mode
// 2. The onboarding query parameter is present
// 3. The example button stories are present
if (isDevMode) {
  addons.register("@storybook/addon-onboarding", async (api) => {
    const isOnboarding = api.getUrlState().queryParams.onboarding;

    if (!isOnboarding) {
      return;
    }

    let hasButtonStories = false;
    try {
      const response = await fetch('./index.json')
      const index = await response.json()
      hasButtonStories = !!index.entries['example-button--primary']
    } catch (e) { }

    if (hasButtonStories) {
      // Add a new DOM element to document.body, where we will bootstrap our React app
      const domNode = document.createElement("div");

      domNode.id = "addon-onboarding";
      // Append the new DOM element to document.body
      document.body.appendChild(domNode);

      // Render the React app
      ReactDOM.render(<App api={api} />, domNode);
    }
  });
}
