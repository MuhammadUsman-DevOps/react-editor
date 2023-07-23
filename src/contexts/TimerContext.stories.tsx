// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { TimerProvider } from "./TimerContext";
import { TimerState } from "./types";
import { TimerContext } from './TimerContext';

// Create the Meta object with metadata for the component
export default {
  title: "Contexts/TimerProvider",
  component: TimerProvider,
  decorators: [
    (Story: React.ComponentType) => (
      <TimerProvider>
        <Story />
      </TimerProvider>
    ),
  ],
} as Meta;

// Define a mock component to consume the TimerContext
const TimerConsumer: React.FC = () => {
  const timerState = React.useContext<TimerState>(TimerContext);
  return (
    <div>
      <h3>Timer State:</h3>
      <pre>{JSON.stringify(timerState, null, 2)}</pre>
    </div>
  );
};

// Create a Template for the Story
const Template: Story = () => <TimerConsumer />;

// Define the Story using the Template
export const Default = Template.bind({});
