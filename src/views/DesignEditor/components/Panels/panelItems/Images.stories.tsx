// Images.stories.tsx
import React from 'react';
import { Meta } from '@storybook/react';
import Images from './Images';

export default {
  title: 'DesignEditor/Panels/Images',
  component: Images,
} as Meta;

// Story for the Images component
export const Default = () => <Images />;
