"use client"
import { useState } from "react"
import {
Lock,
Monitor,
Shield,
User,
Eye,
EyeOff,
} from "lucide-react"
interface LoginFormProps {
onLogin: (
id: string,
password: string
) => Promise<boolean>
isLoading: boolean
loginError: string
isLocked: boolean
lockTimer: number
}
export function LoginForm({
onLogin,
isLoading,
loginError,
isLocked,
lockTimer,
}: LoginFormProps) {
const [loginId, setLoginId] = useState("")
const [password, setPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault()
await onLogin(loginId, password)
}
return (
<div className="min-h-screen bg-background flex items-center justify-center
p-4">
<div className="w-full max-w-md">
<div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
<div className="flex flex-col items-center mb-8">
<div className="p-4 bg-primary/10 rounded-full mb-4">
<Monitor className="h-10 w-10 text-primary" />
</div>
<h1 className="text-2xl font-bold">
IT Equipment Manager
</h1>
</div>
<form
onSubmit={handleSubmit}
className="space-y-5"
>
<div>
<label className="block text-sm mb-2">
Email or Employee ID
</label>
<div className="relative">
<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5
w-5" />
<input
type="text"
value={loginId}
onChange={(e) =>
setLoginId(e.target.value)
}
className="w-full pl-10 pr-4 py-3 border rounded-lg"
/>
</div>
</div>
<div>
<label className="block text-sm mb-2">
Password
</label>
<div className="relative">
<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5
w-5" />
<input
type={showPassword ? "text" : "password"}
value={password}
onChange={(e) =>
setPassword(e.target.value)
}
className="w-full pl-10 pr-12 py-3 border rounded-lg"
/>
<button
type="button"
onClick={() =>
setShowPassword(!showPassword)
}
className="absolute right-3 top-1/2 -translate-y-1/2"
>
{showPassword ? (
    <EyeOff className="h-5 w-5" />
) : (
<Eye className="h-5 w-5" />
)}
</button>
</div>
</div>
{loginError && (
<div className="p-3 bg-red-100 rounded-lg">
<p className="text-sm flex items-center gap-2">
<Shield className="h-4 w-4" />
{loginError}
{isLocked && ` (${lockTimer}s)`}
</p>
</div>
)}
<button
type="submit"
disabled={isLoading || isLocked}
className="w-full py-3 bg-primary text-white rounded-lg"
>
{isLoading ? "Signing in..." : "Sign In"}
</button>
</form>
</div>
</div>
</div>
)
}
