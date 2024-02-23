import type { CodeSnippets } from './types';

const data: CodeSnippets = {
  filename: "Button.stories.js",
  language: "typescript",
  code: [
    [
      {
        snippet: `import { Button } from './Button';`,
      },
    ],
    [
      {
        snippet: `export default {
      title: 'Example/Button',
      component: Button,
      // ...
    };`,
      },
    ],
    [
      { snippet: `export const Primary = {` },
      {
        snippet: `args: {
        primary: true,
        label: 'Click',
        background: 'red'
      }`,
        toggle: true,
      },
      { snippet: `};` },
    ],
    [
      {
        snippet: `// Copy the code below
export const Warning = {
  args: {
    primary: true,
    label: 'Delete now',
    backgroundColor: 'red',
  }
};`,
      },
    ],
  ],
};

export default data;
