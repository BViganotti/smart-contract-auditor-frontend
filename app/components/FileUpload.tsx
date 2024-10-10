import { useState } from 'react'

interface FileUploadProps {
    onFileUpload: (file: File) => void
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (file) {
            onFileUpload(file)
        }
    }

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
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col items-center space-y-4">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input type="file" onChange={handleFileChange} accept=".sol" className="hidden" />
                </label>
                <span className="text-gray-500 dark:text-gray-300">{file ? file.name : 'No file chosen'}</span>
                <button
                    type="submit"
                    disabled={!file}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                    Audit Contract
                </button>
            </div>
        </form>
    )
}
