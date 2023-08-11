// stories/Canvas.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react';
import Canvas from './Canvas'; // Update the path to your Canvas component

export default {
  title: 'DesignEditor/Canvas', // The title under which the stories will be listed in the Storybook sidebar
  component: Canvas,
} as Meta;

export const Default = () => <Canvas />;
