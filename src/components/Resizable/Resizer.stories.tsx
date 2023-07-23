import React from "react";
import { Story, Meta } from "@storybook/react";
import { Resizer, Props, Direction } from "./resizer"; // Make sure the import path is correct based on your project's structure

export default {
  title: "Components/Resizer",
  component: Resizer,
} as Meta;

const onResizeStart: (dir: Direction) => React.MouseEventHandler<HTMLDivElement> = (dir) => (e) => {
  console.log(`Resize started: ${dir}`);
  // You can provide your own implementation for onResizeStart in your application
  // For demonstration purposes, we are just logging the direction to the console here.
};

const Template: Story<Props> = (args) => <Resizer {...args} />;

export const Top = Template.bind({});
// @ts-ignore
// @ts-ignore
Top.args = {
  direction: "top",
  // @ts-ignore
  onResizeStart: onResizeStart("top"),
  children: <div>Top Resizer</div>,
};

export const Right = Template.bind({});
// @ts-ignore
Right.args = {
  direction: "right",
  // @ts-ignore
  onResizeStart: onResizeStart("right"),
  children: <div>Right Resizer</div>,
};

export const Bottom = Template.bind({});
Bottom.args = {
  direction: "bottom",
  // @ts-ignore
  onResizeStart: onResizeStart("bottom"),
  children: <div>Bottom Resizer</div>,
};

export const Left = Template.bind({});
Left.args = {
  direction: "left",
  // @ts-ignore
  onResizeStart: onResizeStart("left"),
  children: <div>Left Resizer</div>,
};

export const TopRight = Template.bind({});
// @ts-ignore
TopRight.args = {
  direction: "topRight",
  // @ts-ignore
  onResizeStart: onResizeStart("topRight"),
  children: <div>Top-Right Resizer</div>,
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: "bottomRight",
  // @ts-ignore
  onResizeStart: onResizeStart("bottomRight"),
  children: <div>Bottom-Right Resizer</div>,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: "bottomLeft",
  // @ts-ignore
  onResizeStart: onResizeStart("bottomLeft"),
  children: <div>Bottom-Left Resizer</div>,
};

export const TopLeft = Template.bind({});

TopLeft.args = {
  direction: "topLeft",
  // @ts-ignore
  onResizeStart: onResizeStart("topLeft"),
  children: <div>Top-Left Resizer</div>,
};
