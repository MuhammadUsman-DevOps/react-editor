import React from "react";
import { Story, Meta } from "@storybook/react";
import Footer from "./Footer";

// Mock the useEditorType hook (for illustration purposes)
jest.mock("~/hooks/useEditorType", () => () => "PRESENTATION");

// Storybook Story
export default {
  title: "DesignEditor/Footer",
  component: Footer,
} as Meta;

const Template: Story = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
