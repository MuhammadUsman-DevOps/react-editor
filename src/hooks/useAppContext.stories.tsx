// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { AppContext, AppProvider } from "~/contexts/AppContext";
import useAppContext from "./useAppContext";

// Create the Meta object with metadata for the story
export default {
  title: "Hooks/useAppContext",
  decorators: [
    (Story: React.ComponentType) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
} as Meta;

// Define a component that uses the useAppContext hook
const AppContextComponent: React.FC = () => {
  const { activePanel, setActivePanel, templates, setTemplates } = useAppContext();

  return (
    <div>
      <h3>Active Panel: {activePanel}</h3>
      <button onClick={() => setActivePanel("TEMPLATES")}>Set Active Panel to TEMPLATES</button>
      <h3>Templates Length: {templates.length}</h3>
      <button onClick={() => setTemplates([])}>Clear Templates</button>
    </div>
  );
};

// Create a Template for the Story
const Template: Story = () => <AppContextComponent />;

// Define the Story using the Template
export const Default = Template.bind({});
