interface DashboardPageProps {
	params: {
		id: Promise<string>;
	};
}

export default async function DashboardPage({ params }: DashboardPageProps) {
	const id = await params.id;
	return <div>Dashboard {id}</div>;
}
