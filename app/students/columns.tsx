"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  student_id: string
  full_name: string
  email: string
  mobile: string
  nationality: string
  student_status: string
  client_name: string
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "student_id",
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
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "student_status",
    header: "Status",
  },
  {
    accessorKey: "client_name",
    header: "Client",
  },


]
