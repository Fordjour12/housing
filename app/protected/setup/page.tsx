import Header from "@/components/header"
import EnvSetup from "@/app/protected/env-setup"

export default function SetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Environment Setup</h1>
        <EnvSetup />
      </div>
    </div>
  )
}

