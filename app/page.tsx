'use client'

import { useState } from 'react'
import FileUpload from './components/FileUpload'
import LoadingAnimation from './components/LoadingAnimation'
import Results from './components/Results'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile)
    setLoading(true)
    
    const formData = new FormData()
    formData.append('contract', uploadedFile)

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Smart Contract Auditor</h1>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <FileUpload onFileUpload={handleFileUpload} />
        {loading && <LoadingAnimation />}
        {results && <Results data={results} />}
      </div>
    </main>
  )
}
