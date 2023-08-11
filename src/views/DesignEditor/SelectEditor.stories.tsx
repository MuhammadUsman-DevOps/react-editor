import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SelectEditor } from './SelectEditor'; // Update the import path based on your file structure
import { DesignType } from "~/interfaces/DesignEditor"
export default {
  title: 'DesignEditor/SelectEditor',
  component: SelectEditor,
  argTypes: {
    setEditorType: { action: 'setEditorType' }, // Add actions for callback props if needed
  },
} as Meta;

// Define the different stories
// @ts-ignore
const Template: Story<{ selectedEditor: DesignType }> = (args) => <SelectEditor {...args} />;

// Story 1
export const Default = Template.bind({});
Default.args = {
  selectedEditor: 'GRAPHIC', // Provide default props here
};

// Story 2
export const PresentationSelected = Template.bind({});
PresentationSelected.args = {
  selectedEditor: 'PRESENTATION',
};
