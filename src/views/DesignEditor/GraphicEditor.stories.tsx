import React from 'react';
import { Meta, Story } from '@storybook/react';
import GraphicEditor from './GraphicEditor';
import Navbar from './components/Navbar';
import Panels from './components/Panels';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Toolbox from './components/Toolbox';
import EditorContainer from './components/EditorContainer';
import ContextMenu from './components/ContextMenu';

// Export default is used to set the title and component to show in Storybook's sidebar
export default {
  title: 'DesignEditor/GraphicEditor',
  component: GraphicEditor,
} as Meta;

const Template: Story = (args) => (
  <EditorContainer>
    <Navbar />
    <div style={{ display: 'flex', flex: 1 }}>
      <Panels />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Toolbox />
        <Canvas />
        <Footer />
      </div>
    </div>
  </EditorContainer>
);

export const Default = Template.bind({});
