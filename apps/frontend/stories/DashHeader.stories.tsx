import React from 'react';
import { Meta, StoryFn } from "@storybook/react"; 
import Header from '../app/compontenten/DashHeader'; // Pas dit pad aan naar jouw projectstructuur
import './tailconfig.css'
export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen', // Optioneel
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};
