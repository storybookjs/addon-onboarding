export default [
  [
    {
      code: `// Button.stories.tsx`,
    },
  ],
  [
    {
      code: `import type { Meta, StoryObj } from '@storybook/react';
    
    import { Button } from './Button';`,
    },
  ],
  [
    {
      code: `const meta: Meta<typeof Button> = {
      title: 'Example/Button',
      component: Button,
      // ...
    };
        
    export default meta;`,
    },
  ],
  [
    { code: `export const Primary: Story = {` },
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
export const Warning: Story = {
  args: {
    primary: true,
    label: 'Delete now',
    backgroundColor: 'red',
  }
};`,
    },
  ],
];
