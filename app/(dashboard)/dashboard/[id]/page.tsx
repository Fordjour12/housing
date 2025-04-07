interface DashboardIdPageProps {
  params: Promise<{ id: string }>
}

export default async function DashboardIdPage({
  params,
}: DashboardIdPageProps) {
  const { id } = await params
  console.log('slug', id)

  return <div>My Post: {id}</div>
}
