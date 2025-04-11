// "use client";

// import type { ReactNode } from "react";
// import { useUser } from "@/context/user-context";
// import type { RolePermission } from "@/types/user";

// interface RoleGuardProps {
// 	children: ReactNode;
// 	requiredPermission?: keyof RolePermission;
// 	fallback?: ReactNode;
// }

// /**
//  * A component that restricts access to children based on user role permissions
//  */
// export function RoleGuard({
// 	children,
// 	requiredPermission,
// 	fallback = <AccessDenied />,
// }: RoleGuardProps) {
// 	const { isAuthenticated, isOnboarding, hasPermission } = useUser();

// 	// If the user is in onboarding, don't show protected content
// 	if (isOnboarding) {
// 		return null;
// 	}

// 	// If the user is not authenticated, don't show protected content
// 	if (!isAuthenticated) {
// 		return null;
// 	}

// 	// If no specific permission is required, show the content
// 	if (!requiredPermission) {
// 		return <>{children}</>;
// 	}

// 	// Check if the user has the required permission
// 	if (hasPermission(requiredPermission)) {
// 		return <>{children}</>;
// 	}

// 	// Otherwise, show the fallback content
// 	return <>{fallback}</>;
// }

// /**
//  * Default access denied component
//  */
// function AccessDenied() {
// 	return (
// 		<div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg border-muted-foreground/25 my-4">
// 			<h3 className="text-lg font-medium mb-2">Access Denied</h3>
// 			<p className="text-muted-foreground max-w-md">
// 				You don't have permission to access this feature. Please contact support
// 				if you believe this is an error.
// 			</p>
// 		</div>
// 	);
// }
