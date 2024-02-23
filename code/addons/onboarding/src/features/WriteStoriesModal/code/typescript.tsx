import type { CodeSnippets } from './types';

const data: CodeSnippets = {
  filename: "Button.stories.ts",
  language: "typescript",
  code: [
    [
      {
        snippet: `import type { Meta, StoryObj } from '@storybook/react';
      
      import { Button } from './Button';`,
      },
    ],
    [
      {
        snippet: `const meta: Meta<typeof Button> = {
        title: 'Example/Button',
        component: Button,
        // ...
      };
          
      export default meta;`,
      },
    ],
    [
      {
        snippet: `type Story = StoryObj<Button>;
        
      export const Primary: Story = {`,
      },
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
  export const Warning: Story = {
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