import React from "react";
import { Story, Meta } from "@storybook/react";
import Pages from "./Pages";

// Storybook Story
export default {
  title: "Pages",
  component: Pages,
} as Meta;

const Template: Story = (args) => <Pages {...args} />;

export const Default = Template.bind({});
Default.args = {};
