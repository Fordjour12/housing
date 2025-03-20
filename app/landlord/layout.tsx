import LandlordHeader from "@/components/landlord-header";

export default function LandlordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<LandlordHeader />
			<div className="container mx-auto py-6 flex-1">{children}</div>
		</div>
	);
}
