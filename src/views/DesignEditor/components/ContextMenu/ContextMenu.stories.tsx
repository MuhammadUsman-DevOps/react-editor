// ContextMenu.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import ContextMenu  from './ContextMenu'; // Assuming you have a file named ContextMenu.tsx exporting the ContextMenu component

// Import the required icons
import BringToFront from '~/components/Icons/BringToFront'
import Delete from '~/components/Icons/Delete'
import Duplicate from '~/components/Icons/Duplicate'
import Elements from '~/components/Icons/Elements'
import Locked from '~/components/Icons/Locked'
import Paste from '~/components/Icons/Paste'
import SendToBack from '~/components/Icons/SendToBack'
import Unlocked from '~/components/Icons/Unlocked'

// Meta information for the Story
export default {
  title: 'DesignEditor/ContextMenu',
  component: ContextMenu,
} as Meta;

// Template for the Story
const Template: Story = (args) => <ContextMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  // If you have any props that the ContextMenu component expects, you can provide them here.
};

// You can add additional stories for different scenarios if needed
export const WithIcons = Template.bind({});
WithIcons.args = {
  // If you have any props that the ContextMenu component expects, you can provide them here.
  // For this example, we'll just pass in the icons for the ContextMenu to show.
  icons: {
    Duplicate: <Duplicate size={24} />,
    BringToFront: <BringToFront size={24} />,
    Delete: <Delete size={24} />,
    Elements: <Elements size={24} />,
    Locked: <Locked size={24} />,
    Paste: <Paste size={24} />,
    SendToBack: <SendToBack size={24} />,
    Unlocked: <Unlocked size={24} />,
  },
};

// Add more stories as needed for different use cases or props.
