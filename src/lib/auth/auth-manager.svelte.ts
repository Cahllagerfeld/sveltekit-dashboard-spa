const localStorageKey = "auth.user";

function getStoredUser() {
	return localStorage.getItem(localStorageKey);
}

function setStoredUser(username: string | null) {
	if (username) {
		localStorage.setItem(localStorageKey, username);
	} else {
		localStorage.removeItem(localStorageKey);
	}
}

export class AuthManager {
	user: string | null = $state(null);
	isAuthenticated = $derived(!!this.user);

	constructor() {
		const user = getStoredUser();
		if (user) {
			this.user = user;
		}
	}

	logout() {
		setStoredUser(null);
		this.user = null;
	}

	login(username: string) {
		this.user = username;
		setStoredUser(username);
	}
}
