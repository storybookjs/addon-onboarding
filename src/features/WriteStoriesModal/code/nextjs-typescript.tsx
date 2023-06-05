export default [
  [
    {
      content: `// Button.stories.tsx`,
    },
  ],
  [
    {
      content: `import type { Meta, StoryObj } from '@storybook/nextjs';
    
    import { Button } from './Button';`,
    },
  ],
  [
    {
      content: `const meta: Meta<typeof Button> = {
      title: 'Example/Button',
      component: Button,
      // ...
    };
        
    export default meta;`,
    },
  ],
  [
    { content: `export const Primary: Story = {` },
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
export const Warning: Story = {
  args: {
    primary: true,
    backgroundColor: 'red',
    label: 'Delete now'
  }
};`,
    },
  ],
];
