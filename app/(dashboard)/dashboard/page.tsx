import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	const userData = await db.query.user.findFirst({
		columns: {
			email: true,
			name: true,
			onboardingCompleted: true,
		},
	});

	console.log(userData);

	return (
		<div>
			<h1>Dashboard</h1>
			<p>
				Welcome to your dashboard{" "}
				<span className="text-sky-500 text-xl">{userData?.name}!</span>
			</p>
			<p>Here you can manage your properties and view your bookings.</p>
			<Badge>
				{userData?.onboardingCompleted ? "Completed" : "Not Completed"}
			</Badge>
		</div>
	);
}
