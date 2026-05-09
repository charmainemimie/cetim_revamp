"use client"
import { useState } from "react"
import { Send } from "lucide-react"
import { ChatMessage } from "../../types"
interface AIChatProps {
messages: ChatMessage[]
onSend: (message: string) => void
}
export function AIChat({
messages,
onSend,
}: AIChatProps) {
const [input, setInput] = useState("")
const handleSend = () => {
if (!input.trim()) return
onSend(input)
setInput("")
}
return (
<div className="max-w-3xl mx-auto space-y-6">
<h2 className="text-2xl font-bold">
AI Assistant
</h2>
<div className="bg-card rounded-xl border h-[500px] flex flex-col">
<div className="flex-1 overflow-y-auto p-4 space-y-4">
{messages.map((msg, index) => (
<div
key={index}
className={`flex ${
msg.role === "user"
? "justify-end"
: "justify-start"
}`}
>
<div className="max-w-[80%] p-3 rounded-lg border">
{msg.content}
</div>
</div>
))}
</div>
<div className="p-4 border-t">
<div className="flex gap-2">
<input
type="text"
value={input}
onChange={(e) =>
setInput(e.target.value)
}
onKeyDown={(e) => {
if (e.key === "Enter") {
handleSend()
}
}}
className="flex-1 border rounded-lg px-4 py-2"
/>
<button
onClick={handleSend}
className="p-2 bg-primary text-white rounded-lg"
>
<Send className="h-5 w-5" />
</button>
</div>
</div>
</div>
</div>
)
}