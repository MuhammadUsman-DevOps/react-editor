// TextEffects.stories.tsx

import React from "react";
import { Meta, Story } from "@storybook/react";
import TextEffects from "./TextEffects";

export default {
  title: "DesignEditor/Panels/TextEffects",
  component: TextEffects,
} as Meta;

const Template: Story = () => <TextEffects />;

export const Default = Template.bind({});
Default.storyName = "Default TextEffects";

export const Customized = Template.bind({});
Customized.storyName = "Customized TextEffects";
Customized.decorators = [
  (Story) => (
    <div style={{ background: "lightblue", padding: "20px" }}>
      <Story />
    </div>
  ),
];
