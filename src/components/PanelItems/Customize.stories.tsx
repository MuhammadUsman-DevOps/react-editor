import React from "react";
import { Meta } from "@storybook/react";
import { Story } from "@storybook/react";
import Customize from "./Customize";

export default {
  title: "DesignEditor/Panels/Customize",
  component: Customize,
} as Meta;

const Template: Story = (args) => <Customize {...args} />;

export const Default = Template.bind({});
