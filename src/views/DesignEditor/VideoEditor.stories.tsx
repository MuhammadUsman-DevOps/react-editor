// File: stories/VideoEditor.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import VideoEditor from './VideoEditor'; // Adjust the import path based on your project structure

export default {
  title: 'DesignEditor/VideoEditor',
  component: VideoEditor,
  parameters: {
    docs: {
      description: {
        component: 'A custom VideoEditor component for the storybook.',
      },
    },
  },
} as Meta;

const Template: Story = () => <VideoEditor />;

export const Default = Template.bind({});
