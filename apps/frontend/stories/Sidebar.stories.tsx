import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Sidebar from "../app/compontenten/Sidebar"; // Pas dit pad aan naar jouw projectstructuur

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen", // Optioneel, afhankelijk van hoe je Storybook wilt opzetten
  },
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  setActiveSection: (section: string) => alert(`Actieve sectie: ${section}`), // Simpele actie om de functie te demonstreren
};
