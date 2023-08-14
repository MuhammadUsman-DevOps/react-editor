// canvas.stories.tsx
import React from 'react';
import { Meta } from '@storybook/react';
import { Canvas } from './canvas'; // Adjust the import path accordingly

export default {
  title: 'React/Canvas',
  component: Canvas,
} as Meta;

// @ts-ignore
const Template = (args) => <Canvas {...args} />;

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  config: {
    // Your default editor config goes here if needed
  },
};
