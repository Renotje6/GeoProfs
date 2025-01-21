import React from 'react';
import { Button, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react';
import Link from 'next/link';
import { Meta, StoryFn } from '@storybook/react';
import RequestForm from '../components/forms/request-form'; // Adjust the import based on your folder structure
import { useForm } from 'react-hook-form';

// Default export to define component metadata
const meta: Meta<typeof RequestForm> = {
  title: 'Components/RequestForm', // Storybook UI display name
  component: RequestForm,
  argTypes: {
    // You could add controls for props here, but for this form, there are no props to control.
  },
};

export default meta;

// Template for the story
const Template: StoryFn = (args:any) => <RequestForm {...args} />;

// Basic story example, showing the form in its default state
export const Default = Template.bind({});
Default.args = {};

// Story with form errors (simulating errors manually)
export const WithErrors = () => {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  
  // Trigger validation on mount to simulate errors
  React.useEffect(() => {
    trigger(); // Simulate validation
  }, [trigger]);

    function setValue(arg0: string, arg1: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <form
      className="w-screen max-w-[400px] flex flex-col gap-10"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="flex gap-2 items-center justify-center">
        <p className="font-medium text-3xl">VERLOF AANVRAGEN</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Select
          {...register('type', { required: 'Please select a leave type' })}
          variant="bordered"
          label="Soort verlof"
          size="lg"
          isInvalid={!!errors.type}
          errorMessage={errors.type?.message?.toString()}
        >
          <SelectItem key="personal">Persoonlijk</SelectItem>
          <SelectItem key="holiday">Vakantie</SelectItem>
        </Select>
        
        <DateRangePicker
          hideTimeZone
          variant="bordered"
          label="Event duration"
          visibleMonths={2}
          onChange={(value) => {
            if (value?.start) setValue('startDate', value.start.toString());
            if (value?.end) setValue('endDate', value.end.toString());
          }}
          isInvalid={!!errors.startDate || !!errors.endDate}
        />
        
        <Input
          {...register('reason', { required: 'Reason is required' })}
          variant="bordered"
          type="text"
          size="md"
          radius="md"
          label="Reden"
          isInvalid={!!errors.reason}
          errorMessage={errors.reason?.message?.toString()}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          type="submit"
          color="primary"
          variant="shadow"
          className="w-full"
        >
          VERSTUUR
        </Button>

        <div className="flex gap-1 text-sm justify-center">
          <p className="text-center text-zinc-400">Heeft u uw wachtwoord vergeten?</p>
          <Link
            href="/reset-password"
            className="text-primary-300 hover:underline"
          >
            Klik hier
          </Link>
        </div>
      </div>
    </form>
  );
};
WithErrors.args = {}; // Trigger validation and show errors on mount
