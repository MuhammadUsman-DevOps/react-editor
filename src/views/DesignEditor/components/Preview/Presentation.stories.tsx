import React from "react";
import { Story, Meta } from "@storybook/react";
import Presentation from "./Presentation";

// Mock the useDesignEditorScenes and useEditor hooks (for illustration purposes)
jest.mock("~/hooks/useDesignEditorScenes", () => jest.fn());
jest.mock("~/react", () => ({
  useEditor: jest.fn(),
}));

// Storybook Story
export default {
  title: "DesignEditor/Presentation",
  component: Presentation,
} as Meta;

const Template: Story = (args) => <Presentation {...args} />;

export const Default = Template.bind({});
Default.args = {};
