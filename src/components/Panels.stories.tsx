import React from "react";
import { Story, Meta } from "@storybook/react";
import Panels from "./Panels";

// Storybook Story
export default {
  title: "DesignEditor/Panels",
  component: Panels,
} as Meta;

const Template: Story = (args) => <Panels {...args} />;

export const Default = Template.bind({});
Default.args = {};
