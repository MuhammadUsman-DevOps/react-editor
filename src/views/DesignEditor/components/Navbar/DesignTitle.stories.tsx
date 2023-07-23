import React from 'react';
import { Story, Meta } from '@storybook/react';
import DesignTitle from './DesignTitle'; // Replace './DesignTitle' with the correct path to your component

export default {
  title: 'DesignEditor/DesignTitle',
  component: DesignTitle,
} as Meta;

// Create a Template for your component with default props
const Template: Story = (args) => <DesignTitle {...args} />;

// Define a Default story with initial state
export const Default = Template.bind({});
Default.args = {
  name: 'My first design.',
};

// Define another story with a different state
export const AnotherState = Template.bind({});
AnotherState.args = {
  name: 'Another Design Title',
};
