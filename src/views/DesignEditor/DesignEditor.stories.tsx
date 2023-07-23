import React from 'react';
import { Meta, Story } from '@storybook/react';
import DesignEditor from './DesignEditor';

export default {
  title: 'DesignEditor/DesignEditor',
  component: DesignEditor,
  argTypes: {
    editorType: {
      control: {
        type: 'select',
        options: ['NONE', 'PRESENTATION', 'VIDEO', 'GRAPHIC'],
      },
    },
  },
} as Meta;

const Template: Story = (args) => <DesignEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  editorType: 'NONE',
};

export const PresentationEditorExample = Template.bind({});
PresentationEditorExample.args = {
  editorType: 'PRESENTATION',
};

export const VideoEditorExample = Template.bind({});
VideoEditorExample.args = {
  editorType: 'VIDEO',
};

export const GraphicEditorExample = Template.bind({});
GraphicEditorExample.args = {
  editorType: 'GRAPHIC',
};
