import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RequestsTable from "../components/dashboard/requests-table"; // Adjust the import based on your folder structure

// Define the type for the component props
interface RequestsTableProps {
  filterValue: string;
  rowsPerPage: number;
  sortDescriptor: {
    column: string;
    direction: "ascending" | "descending";
  };
  page: number;
}

// Default export to define component metadata
const meta: Meta<typeof RequestsTable> = {
  title: "Components/RequestsTable", // Storybook UI display name
  component: RequestsTable,
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

// Template for the story
const Template: StoryFn<RequestsTableProps> = (args:any) => <RequestsTable {...args} />;

// Basic story example, with default args
export const Default = Template.bind({});
Default.args = {
  filterValue: "John",  // Search filter text to pre-fill
  rowsPerPage: 5,  // Number of rows per page
  sortDescriptor: { column: "name", direction: "ascending" },  // Initial sorting state
  page: 1,  // Starting page
};

export const NoFilter = Template.bind({});
NoFilter.args = {
  filterValue: "",  // No search filter
  rowsPerPage: 5,
  sortDescriptor: { column: "name", direction: "ascending" },
  page: 1,
};

export const SortedDescending = Template.bind({});
SortedDescending.args = {
  filterValue: "Doe",  // Search filter for "Doe"
  rowsPerPage: 5,
  sortDescriptor: { column: "date", direction: "descending" },  // Sorting by date in descending order
  page: 1,
};

export const Paginated = Template.bind({});
Paginated.args = {
  filterValue: "Smith",  // Search filter for "Smith"
  rowsPerPage: 2,  // Fewer rows per page for pagination
  sortDescriptor: { column: "name", direction: "ascending" },  // Sorting by name
  page: 2,  // Go to the second page
};
