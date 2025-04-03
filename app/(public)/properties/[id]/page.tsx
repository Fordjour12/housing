interface PropertyPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
	const { id } = await params;

	return (
		<div>
			<h1>Properties</h1>
		</div>
	);
}
