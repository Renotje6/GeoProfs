import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Aanvraag from '../app/compontenten/Aanvraag'; // Adjust the path as necessary

export default {
  title: 'Components/Aanvraag',  // The storybook category and component name
  component: Aanvraag,          // The component to be rendered
} as Meta;

const Template: StoryFn = () => <Aanvraag />;

export const Default = Template.bind({});
Default.args = {
  // You can add props here if needed, e.g., initial data for the Aanvraag component
};
