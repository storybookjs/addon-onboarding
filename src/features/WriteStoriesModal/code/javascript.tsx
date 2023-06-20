export default {
  filename: "Button.stories.jsx",
  code: [
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
    label: 'Delete now',
    backgroundColor: 'red',
  }
};`,
      },
    ],
  ],
};
