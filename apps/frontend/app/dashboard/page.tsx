"use client";

import AbsentionTable from "@/components/dashboard/absention-table";
import RequestsTable from "@/components/dashboard/requests-table";
import UsersTable from "@/components/dashboard/users-table";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const sections = [
    {
      key: "aanvragen",
      label: "AANVRAGEN",
      content: <RequestsTable />,
    },
    {
      key: "absentie",
      label: "ABSENTIE",
      content: <AbsentionTable />,
    },
    {
      key: "gebruikers",
      label: "GEBRUIKERS",
      content: <UsersTable />,
    },
  ];

  return (
    <div className="flex gap-10 w-full xl:w-[80%] justify-between flex-grow-0 my-20">
      <div className="bg w-96 hidden 2xl:flex items-center flex-col lg:p-4 p-2 gap-2 grow-0 bg-black/5 rounded-xl">
        <h2 className="text-xl font-medium">SECTIONS</h2>
        {sections.map((section) => (
          <Button
            key={section.key}
            size="sm"
            className="w-full"
            onClick={() => {
              router.push(`#${section.key}`);
              document.getElementById(section.key)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {section.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-col h-full w-full gap-10">
        {sections.map((section) => (
          <section
            className="md:gap-10 bg-black/5 rounded-xl p-2 lg:p-4 "
            key={section.key}
            id={section.key}
          >
            <div>{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
