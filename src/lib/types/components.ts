import type { components, operations } from "./core";

export type StackComponent = components["schemas"]["ComponentResponse"];
export type StackComponentList = components["schemas"]["Page_ComponentResponse_"];

export type StackComponentListQueries = NonNullable<
	operations["list_workspace_stack_components_api_v1_workspaces__workspace_name_or_id__components_get"]["parameters"]["query"]
>;
