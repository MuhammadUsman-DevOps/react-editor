import React from 'react';
import { Meta, Story } from '@storybook/react';

import PresentationEditor from './PresentationEditor';

// Meta information about the component
const meta: Meta = {
  title: 'DesignEditor/PresentationEditor',
  component: PresentationEditor,
};

// Story object representing the different states/scenarios for the component
const Template: Story = () => <PresentationEditor />;

// The default story
export const Default = Template.bind({});

export default meta;
