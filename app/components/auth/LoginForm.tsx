"use client"
import { SignIn } from "@clerk/nextjs"

export function LoginForm() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" />
                        </div>
                        <h1 className="text-2xl font-bold">IT Equipment Manager</h1>
                    </div>

                    <SignIn routing="hash" />
                </div>
            </div>
        </div>
    )
}
