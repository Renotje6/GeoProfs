import React from "react";
import { Meta, StoryFn } from "@storybook/react"; // Gebruik Meta en StoryFn
import CustomLink from "../app/compontenten/CustomLink";
import './tailconfig.css'

export default {
  title: "Components/CustomLink",
  component: CustomLink,
  argTypes: {
    href: { control: "text" },
    text: { control: "text" },
    height: { control: "text" },
    width: { control: "text" },
    className: { control: "text" },
  },
} as Meta<typeof CustomLink>;

const Template: StoryFn<typeof CustomLink> = (args) => <CustomLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "/",
  text: "Default Link",
  height: "40px",
  width: "150px",
  className: "inline-block text-center bg-button text-white rounded-xl btn",
};

export const Large = Template.bind({});
Large.args = {
  href: "/large",
  text: "Large Link",
  height: "60px",
  width: "200px",
  className: "bg-green-500",
};

export const Small = Template.bind({});
Small.args = {
  href: "/small",
  text: "Small Link",
  height: "30px",
  width: "100px",
  className: "bg-red-500",
};
