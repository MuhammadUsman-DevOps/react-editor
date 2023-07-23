// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { AppProvider, AppContext, IAppContext } from "./AppContext";
import { PanelType } from "~/constants/app-options";

// Create the Meta object with metadata for the component
export default {
  title: "Contexts/AppContext",
  component: AppProvider,
  decorators: [
    (Story: React.ComponentType) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
} as Meta;

// Define a mock component to consume the AppContext
const ContextConsumer: React.FC = () => {
  const context = React.useContext<IAppContext>(AppContext);
  return (
    <div>
      <h3>App Context:</h3>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
};

// Create a Template for the Story
const Template: Story = () => <ContextConsumer />;

// Define the Story using the Template
export const Default = Template.bind({});

