"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  folio_id: string
  group_code: string
  client_name: string
  full_name: string
  start_date: string
  end_date: string
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "folio_id",
    header: "ID",
  },
  {
    accessorKey: "group_code",
    header: "Group",
  },
  {
    accessorKey: "client_name",
    header: "Client",
  },
  {
    accessorKey: "full_name",
    header: "Teacher",
  },
  {
    accessorKey: "start_date",
    header: "Start date",
  },
  {
    accessorKey: "end_date",
    header: "End date",
  },

]
