// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { DesignEditorProvider, DesignEditorContext, ISceneEditorContext } from "./DesignEditor";

// Create the Meta object with metadata for the component
export default {
  title: "Contexts/DesignEditor",
  component: DesignEditorProvider,
  decorators: [
    (Story: React.ComponentType) => (
      <DesignEditorProvider>
        <Story />
      </DesignEditorProvider>
    ),
  ],
} as Meta;

// Define a mock component to consume the DesignEditorContext
const ContextConsumer: React.FC = () => {
  const context = React.useContext<ISceneEditorContext>(DesignEditorContext);
  return (
    <div>
      <h3>Design Editor Context:</h3>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
};

// Create a Template for the Story
const Template: Story = () => <ContextConsumer />;

// Define the Story using the Template
export const Default = Template.bind({});
