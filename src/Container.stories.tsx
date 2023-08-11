import React from "react";
import { Story, Meta } from "@storybook/react";
import Container from "./Container";

// Storybook Story
export default {
  title: "Container",
  component: Container,
} as Meta;

// @ts-ignore
const Template: Story = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>Content goes here</div>,
};
