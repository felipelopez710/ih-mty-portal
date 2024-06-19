"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  client_id: string
  client_name: string
  client_type: string
  state: string
  status: string
  phone_number: string
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "client_id",
    header: "ID",
  },
  {
    accessorKey: "client_name",
    header: "Name",
  },
  {
    accessorKey: "state",
    header: "Location",
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

]
