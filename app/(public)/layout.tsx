import Header from "@/components/header";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
