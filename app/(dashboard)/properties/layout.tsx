export default function PropertiesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			{children}
		</div>
	);
}
