import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { user, userRole } from "@/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export default async function OnboardingPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		redirect("/login");
	}

	const userData = await db
		.select({ onboardingCompleted: user.onboardingCompleted })
		.from(user)
		.where(eq(user.id, session.user.id));

	if (userData[0]?.onboardingCompleted) {
		redirect("/dashboard");
	}

	async function assignRole(formData: FormData) {
		"use server";
		const roleId = formData.get("role") as string;
		await db.insert(userRole).values({
			userId: session?.user.id as string,
			roleId,
		});

		await db
			.update(user)
			.set({ onboardingCompleted: true })
			.where(eq(user.id, String(session?.user.id)));

		redirect("/dashboard");
	}

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Welcome! Select Your Role</h1>
			<form action={assignRole} className="space-y-4">
				<div>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="block mb-1">Choose your role:</label>
					<select name="role" className="w-full p-2 border rounded" defaultValue="">
						<option value="" disabled>
							Select a role
						</option>
						<option value="renter">Renter</option>
						<option value="landlord">Landlord</option>
						<option value="property-manager">Property Manager</option>
					</select>
				</div>
				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
					Continue
				</button>
			</form>
		</div>
	);
}
