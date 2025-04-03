import { UserProvider } from "@/context/user-context";
import { NotificationsProvider } from "@/context/notifications-context";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<UserProvider>
			<NotificationsProvider>{children}</NotificationsProvider>
		</UserProvider>
	);
}
