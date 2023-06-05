export default [
  [
    {
      content: `// Button.stories.jsx`,
    },
  ],
  [
    {
      content: `import { Button } from './Button';`,
    },
  ],
  [
    {
      content: `const meta = {
      title: 'Example/Button',
      component: Button,
      // ...
    };
        
    export default meta;`,
    },
  ],
  [
    { content: `export const Primary = {` },
    {
      content: `args: {
        primary: true,
        label: 'Click',
        background: 'red'
      }`,
      toggle: true,
    },
    { content: `};` },
  ],
  [
    {
      content: `// Copy the code below
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
