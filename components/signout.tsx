"use client";
	
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
			},
		});
	};

	return (
		<button className="flex items-center py-2 gap-2 ml-2" onClick={handleSignOut}>
			<LogOut className="mr-2 size-4" />
			<span className="text-sm">Logout</span>
		</button>
	);
}
