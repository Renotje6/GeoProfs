import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Footer from "../app/compontenten/DashFooter"; // Pas dit pad aan naar jouw projectstructuur

export default {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen", // Optioneel
  },
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  Links: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};
