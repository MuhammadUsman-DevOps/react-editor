import React from "react";
import { Story, Meta } from "@storybook/react";
import Navbar from "./Navbar";

// Create a dummy context for the useDesignEditorContext hook (for illustration purposes)
const DummyDesignEditorContext = React.createContext({
  setDisplayPreview: () => {},
  setScenes: () => {},
  setCurrentDesign: () => {},
  currentDesign: { id: 1, name: "Sample Design", frame: "Sample Frame", scenes: [] },
  scenes: [],
});

// Create a dummy editor context for the useEditor hook (for illustration purposes)
const DummyEditor = React.createContext({
  scene: {
    exportToJSON: () => ({
      id: 1,
      layers: [],
      name: "Sample Scene",
    }),
  },
  renderer: {
    render: async () => "Sample Preview",
  },
  canvasId: "sample-canvas-id",
});

// Storybook Story
export default {
  title: "DesignEditor/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <DummyDesignEditorContext.Provider value={dummyDesignEditorContextData}>
        <DummyEditor.Provider value={dummyEditorData}>
          <Story />
        </DummyEditor.Provider>
      </DummyDesignEditorContext.Provider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};

// Dummy data for the context providers (for illustration purposes)
const dummyDesignEditorContextData = {
  setDisplayPreview: () => {},
  setScenes: () => {},
  setCurrentDesign: () => {},
  currentDesign: { id: 1, name: "Sample Design", frame: "Sample Frame", scenes: [] },
  scenes: [],
};

const dummyEditorData = {
  scene: {
    exportToJSON: () => ({
      id: 1,
      layers: [],
      name: "Sample Scene",
    }),
  },
  renderer: {
    render: async () => "Sample Preview",
  },
  canvasId: "sample-canvas-id",
};
