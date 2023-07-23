import React from "react";
import { Story, Meta } from "@storybook/react";
import Graphic from "./Graphic";

// Mock the useEditor hook (for illustration purposes)
jest.mock("~/react", () => ({
  useEditor: jest.fn(),
}));

// Storybook Story
export default {
  title: "DesignEditor/Graphic",
  component: Graphic,
} as Meta;

const Template: Story = (args) => <Graphic {...args} />;

export const Default = Template.bind({});
Default.args = {};
