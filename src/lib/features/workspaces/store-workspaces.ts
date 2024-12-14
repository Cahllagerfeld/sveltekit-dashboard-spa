const localStorageKey = "workspace.selected";

export function setWorkspaceToLocalStorage(workspaceId: string | null) {
	if (workspaceId === null) {
		localStorage.removeItem(localStorageKey);
	} else {
		localStorage.setItem(localStorageKey, workspaceId);
	}
}

export function getWorkspaceFromLocalStorage() {
	return localStorage.getItem(localStorageKey);
}
