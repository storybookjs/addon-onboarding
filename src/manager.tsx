import ReactDOM from "react-dom";
import React, { lazy, Suspense } from "react";
import { addons } from "@storybook/manager-api";

const App = lazy(() => import("./App"));

// The addon is enabled only when:
// 1. The onboarding query parameter is present
// 2. The example button stories are present
addons.register("@storybook/addon-onboarding", async (api) => {
  const urlState = api.getUrlState();
  const isOnboarding = urlState.path === '/onboarding' || urlState.queryParams.onboarding === 'true';

  let hasButtonStories = false;
  try {
    const response = await fetch("./index.json");
    const index = await response.json();
    hasButtonStories = !!index.entries["example-button--primary"];
  } catch (e) {
    hasButtonStories = !!document.getElementById('example-button--primary')
  }

  if (!hasButtonStories) {
    console.warn(`[@storybook/addon-onboarding] It seems like you have finished the onboarding experience in Storybook! Therefore this addon is not necessary anymore and will not be loaded. You are free to remove it from your project. More info: https://github.com/storybookjs/addon-onboarding#uninstalling`);
    return;
  }

  if (!isOnboarding || window.innerWidth < 730) {
    return;
  }

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
});
