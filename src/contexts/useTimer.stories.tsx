// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { TimerContext, TimerProvider } from "./TimerContext";
import { useTimer } from "./useTimer";

// Create the Meta object with metadata for the story
export default {
  title: "Contexts/useTimer",
  decorators: [
    (Story: React.ComponentType) => (
      <TimerProvider>
        <Story />
      </TimerProvider>
    ),
  ],
} as Meta;

// Define a component that uses the useTimer hook
const TimerComponent: React.FC = () => {
  const { start, pause, reset, status, time, setTime } = useTimer();

  return (
    <div>
      <h3>Timer Status: {status}</h3>
      <h3>Timer Time: {time}</h3>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setTime(120)}>Set Time to 120</button>
    </div>
  );
};

// Create a Template for the Story
const Template: Story = () => <TimerComponent />;

// Define the Story using the Template
export const Default = Template.bind({});
