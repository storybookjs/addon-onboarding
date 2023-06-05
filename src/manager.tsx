import ReactDOM from "react-dom";
import React, { lazy, Suspense } from "react";
import { addons } from "@storybook/manager-api";

const App = lazy(() => import("./App"));

// The addon is enabled only when:
// 1. The onboarding query parameter is present
// 2. The example button stories are present
addons.register("@storybook/addon-onboarding", async (api) => {
  const isOnboarding = api.getUrlState().path === '/onboarding';

  if (!isOnboarding) {
    return;
  }

  let hasButtonStories = false;
  try {
    const response = await fetch("./index.json");
    const index = await response.json();
    hasButtonStories = !!index.entries["example-button--primary"];
  } catch (e) {}

  if (hasButtonStories) {
    // Add a new DOM element to document.body, where we will bootstrap our React app
    const domNode = document.createElement("div");

    domNode.id = "addon-onboarding";
    // Append the new DOM element to document.body
    document.body.appendChild(domNode);

    // Render the React app
    ReactDOM.render(
      <Suspense fallback={<div>Loading...</div>}>
        <App api={api} />
      </Suspense>,
      domNode
    );
  }
});
