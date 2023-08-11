import React from "react";
import { Story, Meta } from "@storybook/react";
import Playback from "./Playback";

// Mock the useEditor and other hooks (for illustration purposes)
jest.mock("~/react", () => ({
  useEditor: jest.fn(),
  useZoomRatio: jest.fn(),
}));
jest.mock("~/contexts/useTimer", () => ({
  useTimer: jest.fn(),
}));
jest.mock("~/hooks/useDesignEditorScenes", () => jest.fn());

// Storybook Story
export default {
  title: "DesignEditor/Playback",
  component: Playback,
} as Meta;

const Template: Story = (args) => <Playback {...args} />;

export const Default = Template.bind({});
Default.args = {};
