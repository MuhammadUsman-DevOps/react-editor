import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import InfiniteScrolling, { Props } from "./InfiniteScrolling"; // Make sure the import path is correct based on your project's structure

export default {
  title: "Components/InfiniteScrolling",
  component: InfiniteScrolling,
} as Meta;

// Mock function to fetch more data (you can provide your own implementation for testing purposes)
const fetchData = () => {
  action("Fetch more data")();
};

const Template: Story<Props> = (args) => <InfiniteScrolling {...args} />;

export const Example = Template.bind({});
Example.args = {
  fetchData,
  hasMore: true,
  children: (
    <div>
      <h2>Scroll down to load more data</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        {/* Add more list items to simulate scroll */}
      </ul>
    </div>
  ),
};
