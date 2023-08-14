import React from "react";
import { Story, Meta } from "@storybook/react";
import LazyLoadImage from "./LazyLoadImage"; // Make sure the import path is correct based on your project's structure

export default {
  title: "Components/LazyLoadImage",
  component: LazyLoadImage,
} as Meta;

const Template: Story<{ url: string }> = (args) => <LazyLoadImage {...args} />;

export const Example = Template.bind({});
Example.args = {
  url: "https://example.com/image.jpg", // Replace with the actual URL of the image you want to load
};
