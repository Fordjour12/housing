"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

export default function signout() {
	return (
		<button
			type="button"
			className="flex items-center gap-2"
			onClick={() => authClient.signOut()}
		>
			<LogOut className="size-4" />
			Logout
		</button>
	);
}
