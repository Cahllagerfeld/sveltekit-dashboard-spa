import { Checkbox } from "@/components/ui/checkbox";
import { renderComponent } from "@/components/ui/data-table";
import type { StackComponent } from "@/types/components";
import type { ColumnDef } from "@tanstack/table-core";

export const stackComponentColumns: ColumnDef<StackComponent>[] = [
	{
		id: "select",
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				controlledChecked: true,
				"aria-label": "Select all",
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				controlledChecked: true,
				"aria-label": "Select row",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		header: "Name",
		accessorKey: "name",
		meta: {
			class: "w-1/2",
		},
	},
	{
		header: "Type",
		accessorFn: (row) => row.body?.type,
		meta: {
			class: "w-[17.5%]",
		},
	},
	{
		header: "Flavor",
		accessorFn: (row) => row.resources?.flavor.name,
		meta: {
			class: "w-[17.5%]",
		},
	},
];
