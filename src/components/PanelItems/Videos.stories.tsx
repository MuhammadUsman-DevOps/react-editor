// Videos.stories.tsx

import React from "react";
import { Meta, Story } from "@storybook/react";
import Videos from "./Videos";

export default {
  title: "DesignEditor/Panels/Videos",
  component: Videos,
} as Meta;

const Template: Story = () => <Videos />;

export const Default = Template.bind({});
Default.storyName = "Default Videos";

export const Customized = Template.bind({});
Customized.storyName = "Customized Videos";
Customized.decorators = [
  (Story) => (
    <div style={{ background: "lightblue", padding: "20px" }}>
      <Story />
    </div>
  ),
];

export const WithVideos = Template.bind({});
WithVideos.storyName = "Videos with Custom Videos";
WithVideos.args = {
  videos: [
    {
      id: 1,
      preview: "https://example.com/video1-preview.png",
      src: "https://example.com/video1.mp4",
    },
    {
      id: 2,
      preview: "https://example.com/video2-preview.png",
      src: "https://example.com/video2.mp4",
    },
    // Add more videos here...
  ],
};

export const WithCustomThumbnails = Template.bind({});
WithCustomThumbnails.storyName = "Videos with Custom Thumbnails";
WithCustomThumbnails.args = {
  videos: [
    {
      id: 1,
      thumbnail: "https://example.com/thumbnail1.png",
      src: "https://example.com/video1.mp4",
    },
    {
      id: 2,
      thumbnail: "https://example.com/thumbnail2.png",
      src: "https://example.com/video2.mp4",
    },
    // Add more videos here...
  ],
};
