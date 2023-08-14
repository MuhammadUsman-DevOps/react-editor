import React from "react";
import { Story, Meta } from "@storybook/react";
import Graphic from "./Graphic";

// Mock the useEditor hook (for illustration purposes)
// @ts-ignore
jest.mock("~/react", () => ({
  // @ts-ignore
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
