import React from "react";
import { Story, Meta } from "@storybook/react";
import Scrollable from "./Scrollable";

export default {
  title: "Components/Scrollable",
  component: Scrollable,
  argTypes: {
    autoHide: { control: "boolean" },
  },
} as Meta;

const Template: Story<{ children: React.ReactNode; autoHide?: boolean }> = (args) => (
  <Scrollable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <div style={{ height: "2000px", background: "red" }}>
        Scroll down to see the scrollbars
      </div>
    </>
  ),
  autoHide: false,
};
export const WithAutoHide = Template.bind({});
WithAutoHide.args = {
  children: (
    <>
      <div style={{ height: "2000px", background: "blue" }}>
        Scroll down to see the scrollbars
      </div>
    </>
  ),
  autoHide: true,
};
