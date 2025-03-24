"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function EnvSetup() {
  const [apiKey, setApiKey] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // In a real app, this would be saved to .env.local
    // For this demo, we'll just show a success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Google Maps API Setup</h2>
      <p className="text-sm text-muted-foreground mb-4">
        To use the Google Maps integration, you need to add your API key to the environment variables.
      </p>

      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Create a file named .env.local in your project root and add the following:
          <pre className="mt-2 p-2 bg-destructive/10 rounded text-xs overflow-x-auto">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
          </pre>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium">
            Google Maps API Key
          </label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google Maps API key"
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save API Key
        </Button>

        {showSuccess && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              API key saved successfully. Restart your development server for changes to take effect.
            </AlertDescription>
          </Alert>
        )}

        <p className="text-xs text-muted-foreground">
          Note: In a production environment, you should restrict your API key to specific domains and enable only the
          necessary Google Maps services.
        </p>
      </div>
    </div>
  )
}

