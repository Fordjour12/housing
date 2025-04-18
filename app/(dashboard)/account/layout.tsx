"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useRouter } from "next/navigation";

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const goBack = () => {
		router.push("/");
	};
	return (
		<div className="flex flex-col gap-2 h-screen">
			<Button type="submit" onClick={goBack} className="w-fit">
				<ArrowLeft />
				Go Home
			</Button>
			{children}
		</div>
	);
}
