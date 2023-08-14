import React from "react";
import { Story, Meta } from "@storybook/react";
import Loading from "./Loading"; // Make sure the import path is correct based on your project's structure

export default {
  title: "Components/Loading",
  component: Loading,
} as Meta;

const Template: Story<{ text?: string }> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithText = Template.bind({});
WithText.args = {
  text: "Loading...", // Replace with any text you want to display alongside the loading animation
};
