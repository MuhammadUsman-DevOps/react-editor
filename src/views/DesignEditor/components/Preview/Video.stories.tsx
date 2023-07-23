import React from "react";
import { Story, Meta } from "@storybook/react";
import Video, { VideoProps } from "./Video";

// Mock the useEditor and useDesignEditorPages hooks (for illustration purposes)
jest.mock("~/react/useEditor");
jest.mock("~/hooks/useDesignEditorScenes");

// Storybook Story
export default {
  title: "DesignEditor/Video",
  component: Video,
} as Meta;

const Template: Story<VideoProps> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {};
