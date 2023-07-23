// PathFill.stories.tsx

import React from "react";
import { Meta, Story } from "@storybook/react";
import PathFill from "./PathFill";

export default {
  title: "DesignEditor/Panels/PathFill", // The title for your component category in Storybook
  component: PathFill, // The component you want to wrap in Storybook
} as Meta;

// Your component's Story
export const Default: Story = () => <PathFill />;
Default.storyName = "Default PathFill";
