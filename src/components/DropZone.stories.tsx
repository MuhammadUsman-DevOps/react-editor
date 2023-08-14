import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DropZone, { Props } from "./DropZone"; // Make sure the import path is correct based on your project's structure

export default {
  title: "Components/DropZone",
  component: DropZone,
} as Meta;

// Mock function to handle dropped files (you can provide your own implementation for testing purposes)
const handleDropFiles = (files: FileList) => {
  action("Files dropped")(files);
};

const Template: Story<Props> = (args) => <DropZone {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleDropFiles,
  children: <p>Drag and drop files into the area.</p>,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  handleDropFiles,
  children: (
    <div>
      <h2>Upload Area</h2>
      <p>Drag and drop files here to upload.</p>
    </div>
  ),
};

export const Dragging = Template.bind({});
Dragging.args = {
  handleDropFiles,
  children: <p>Drag your files here...</p>,
};
