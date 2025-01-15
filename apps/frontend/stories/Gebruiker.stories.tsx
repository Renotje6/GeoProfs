import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Gebruikers from "../app/compontenten/Gebruikers"; // Pas dit pad aan naar jouw projectstructuur
import './tailconfig.css'
export default {
  title: "Pages/Gebruikers",
  component: Gebruikers,
  parameters: {
    layout: "fullscreen", // Optioneel, afhankelijk van hoe je Storybook wilt opzetten
  },
} as Meta<typeof Gebruikers>;

const Template: StoryFn<typeof Gebruikers> = (args) => <Gebruikers {...args} />;

export const Default = Template.bind({});
Default.args = {};
