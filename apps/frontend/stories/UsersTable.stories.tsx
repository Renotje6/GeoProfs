import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import UsersTable from "../components/dashboard/users-table"; // Adjust the import based on your folder structure
import "../styles/globals.css";
// Define the type for the component props
interface UsersTableProps {
  filterValue: string;
  rowsPerPage: number;
  sortDescriptor: {
    column: string;
    direction: "ascending" | "descending";
  };
  page: number;
}

// Default export to define component metadata
const meta: Meta<typeof UsersTable> = {
  title: "Components/UsersTable", // Storybook UI display name
  component: UsersTable,
  argTypes: {
    filterValue: { control: "text" },  // Allows controlling the search input text
    rowsPerPage: { control: "number" },  // Allows controlling the number of rows per page
    sortDescriptor: { 
      control: "object"  // Allows controlling sorting behavior
    },
    page: { control: "number" },  // Allows controlling the current page number
  },
};

export default meta;

// Template for the story, corrected to use Story instead of StoryObj
const Template: StoryFn<UsersTableProps> = (args:any) => (
  <UsersTable {...args} />
);

// Basic story example, with default args
export const Default = Template.bind({});
Default.args = {
  filterValue: "John",  // Search filter text to pre-fill
  rowsPerPage: 5,  // Number of rows per page
  sortDescriptor: { column: "name", direction: "ascending" },  // Initial sorting state
  page: 1,  // Starting page
};
