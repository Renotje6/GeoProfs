import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoginForm from '../components/forms/login-form'; // Adjust the import based on your folder structure

// Default export to define component metadata
const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm', // Storybook UI display name
  component: LoginForm,
  argTypes: {
    // You could add controls for props here, but for this form, there are no props to control.
  },
};

export default meta;

// Template for the story
const Template: StoryFn = (args:any) => <LoginForm {...args} />;

// Basic story example, showing the login form in its default state
export const Default = Template.bind({});
Default.args = {
  // Default state (no user input, no errors)
};

// Story with form errors
export const WithErrors = Template.bind({});
WithErrors.args = {
  // You can simulate errors by manually triggering validation in your form
  // For example, you can trigger the "required" error for email and password fields
};
