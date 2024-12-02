import JsonFormatter from '@/components/JsonFormatter'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1d2b64] to-[#f8cdda] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4 shadow-text">
          JSON Formatter Tool
        </h1>
        <p className="text-xl text-gray-200 text-center mb-8">
          Paste your JSON string below and click &quot;Format JSON&quot; to see the formatted output.
        </p>
        <JsonFormatter />
      </div>
    </main>
  )
}
