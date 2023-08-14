import React from "react";
import { Story, Meta } from "@storybook/react";
import Preview, { ComponentProps } from "./Preview";

// Mock the useEditorType hook (for illustration purposes)
// @ts-ignore
jest.mock("~/hooks/useEditorType", () => jest.fn());

// Storybook Story
export default {
  title: "DesignEditor/Preview",
  component: Preview,
} as Meta;

const Template: Story<ComponentProps> = (args) => <Preview {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  setIsOpen: () => {},
};
