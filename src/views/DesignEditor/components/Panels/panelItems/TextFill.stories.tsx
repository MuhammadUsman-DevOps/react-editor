// TextFill.stories.tsx

import React from "react";
import { Meta, Story } from "@storybook/react";
import TextFill from "./TextFill";

export default {
  title: "DesignEditor/Panels/TextFill",
  component: TextFill,
} as Meta;

const Template: Story = () => <TextFill />;

export const Default = Template.bind({});
Default.storyName = "Default TextFill";

export const Customized = Template.bind({});
Customized.storyName = "Customized TextFill";
Customized.decorators = [
  (Story) => (
    <div style={{ background: "lightblue", padding: "20px" }}>
      <Story />
    </div>
  ),
];
