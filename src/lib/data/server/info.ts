import type { ServerInfo } from "@/types/server";
import { apiPaths } from "../api";
import { type ApiClient } from "../api-client";

export async function fetchServerInfo(client: ApiClient): Promise<ServerInfo> {
	const data = await client<ServerInfo>(apiPaths.info);
	return data;
}
