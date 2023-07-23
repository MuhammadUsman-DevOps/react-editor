import React from "react";
import { Meta } from "@storybook/react";
import { Story } from "@storybook/react";
import Elements from "./Elements";

export default {
  title: "DesignEditor/Panels/Elements",
  component: Elements,
} as Meta;

const Template: Story = (args) => <Elements {...args} />;

export const Default = Template.bind({});

