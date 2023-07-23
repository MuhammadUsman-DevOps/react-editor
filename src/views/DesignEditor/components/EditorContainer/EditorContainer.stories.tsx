// EditorContainer.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import EditorContainer from './index';

export default {
  title: 'DesignEditor/EditorContainer',
  component: EditorContainer,
} as Meta;

// @ts-ignore
const Template: Story = (args) => <EditorContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add any props you want to set for the Default story here (if applicable).
};
