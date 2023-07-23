import React from "react";
import { Story, Meta } from "@storybook/react";
import PanelsList from "./PanelsList";

// Mock the useAppContext and useEditorType hooks (for illustration purposes)
jest.mock("~/hooks/useAppContext", () => () => ({
  activePanel: "Assets",
  setActivePanel: () => {},
}));
jest.mock("~/hooks/useEditorType", () => () => "VIDEO");

// Storybook Story
export default {
  title: "DesignEditor/PanelsList",
  component: PanelsList,
} as Meta;

const Template: Story = (args) => <PanelsList {...args} />;

export const Default = Template.bind({});
Default.args = {};
