import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { user } from "@/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import OnboardingClient from "@/app/(auth)/onboarding/boading-client";


export default async function OnboardingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Get the user's onboarding status
  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    columns: {
      onboardingCompleted: true,
    },
  });

  if (!userData) {
    redirect("/login");
  }

  if (userData.onboardingCompleted) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <OnboardingClient />
    </div>
  );
}
