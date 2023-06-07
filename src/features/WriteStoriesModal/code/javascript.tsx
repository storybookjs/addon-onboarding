export default [
  [
    {
      code: `// Button.stories.jsx`,
    },
  ],
  [
    {
      code: `import { Button } from './Button';`,
    },
  ],
  [
    {
      code: `export default {
      title: 'Example/Button',
      component: Button,
      // ...
    };`,
    },
  ],
  [
    { code: `export const Primary = {` },
    {
      code: `args: {
        primary: true,
        label: 'Click',
        background: 'red'
      }`,
      toggle: true,
    },
    { code: `};` },
  ],
  [
    {
      code: `// Copy the code below
export const Warning = {
  args: {
    primary: true,
    backgroundColor: 'red',
    label: 'Delete now'
  }
};`,
    },
  ],
];
