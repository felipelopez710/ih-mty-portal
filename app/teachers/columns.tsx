"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  teacher_id: string
  full_name: string
  email: string
  mobile: string
  state: string
  status: string
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "teacher_id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Phone",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

]
