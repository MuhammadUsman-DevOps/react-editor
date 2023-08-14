// Layers.stories.tsx

import React from "react";
import { Meta, Story } from "@storybook/react";
import Layers from "./Layers";

export default {
  title: "DesignEditor/Panels/Layers", // The title for your component category in Storybook
  component: Layers, // The component you want to wrap in Storybook
} as Meta;

// Your component's Story
export const Default: Story = () => <Layers />;
Default.storyName = "Default Layers";

