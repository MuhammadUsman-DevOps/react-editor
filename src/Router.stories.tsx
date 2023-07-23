// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Import the Router component
import Router from "./Router";

// Create the Meta object with metadata for the component
export default {
  title: "Components/Router",
  component: Router,
  decorators: [(Story: React.ComponentType) => <MemoryRouter><Story /></MemoryRouter>],
} as Meta;

// Create a Template for the Story
const Template: Story = () => <Router />;

// Define the Story using the Template
export const Default = Template.bind({});
