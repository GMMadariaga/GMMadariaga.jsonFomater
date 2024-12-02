'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const jsonObjects = extractJson(input)
      const formattedOutput = jsonObjects
        .map((obj) => syntaxHighlight(JSON.stringify(obj, null, 2)))
        .join('<br/><br/>')
      setOutput(formattedOutput)
      setError('')
    } catch (err) {
      if (err instanceof Error) {
        setError('Invalid JSON: ' + err.message)
      } else {
        setError('Invalid JSON: An unknown error occurred')
      }
      setOutput('')
    }
  }

  const extractJson = (text: string) => {
    const jsonRegex = /\{(?:[^{}]|\{[^{}]*\})*\}/g
    const matches = text.match(jsonRegex)
    if (matches && matches.length > 0) {
      return matches.map((match) => JSON.parse(match))
    }
    throw new Error('No valid JSON found')
  }

  const syntaxHighlight = (json: string) => {
    return json
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        (match) => {
          let cls = 'text-blue-400' // Default color for keys
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-yellow-400' // Key color
            } else {
              cls = 'text-green-400' // String value color
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-purple-400' // Boolean color
          } else if (/null/.test(match)) {
            cls = 'text-gray-400' // Null color
          } else if (/^-?\d+/.test(match)) {
            cls = 'text-red-400' // Number color
          }
          return `<span class="${cls}">${match}</span>`
        }
      )
  }

  const copyToClipboard = () => {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = output
    const text = tempElement.innerText || tempElement.textContent || ''  
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Copied to clipboard!')
      },
      (err) => {
        console.error('Could not copy text: ', err)
      }
    )
  }
  

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="min-h-[150px] font-mono text-sm"
        />
        <Button
          onClick={formatJson}
          className="absolute right-2 bottom-2 bg-red-500 hover:bg-red-600 text-white"
        >
          Format JSON
        </Button>
      </div>
      {error && <p className="text-red-500 font-bold">{error}</p>}
      {output && (
        <Card className="p-4 bg-gray-800 relative">
          <pre
            className="font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-[400px]"
            dangerouslySetInnerHTML={{ __html: output }}
          ></pre>
          <Button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white"
          >
            Copy
          </Button>
        </Card>
      )}
    </div>
  )
}
