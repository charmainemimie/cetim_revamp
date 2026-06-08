"use client"

import { SignIn } from "@clerk/nextjs"

export function LoginForm() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SignIn 
        routing="hash" 
        appearance={{
          elements: {
            // Main card container layout matching your theme
            cardBox: "w-full max-w-md shadow-lg border border-border rounded-2xl bg-card",
            card: "bg-transparent shadow-none p-8",
            
            // Header text styling
            headerTitle: "text-2xl font-bold text-foreground",
            headerSubtitle: "text-sm text-muted-foreground mt-1",
            
            // Form buttons and input elements
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground text-sm normal-case rounded-lg",
            formFieldInput: "bg-background border-border text-foreground rounded-lg focus:ring-primary focus:border-primary",
            socialButtonsBlockButton: "border-border bg-transparent text-foreground hover:bg-muted rounded-lg",
            
            // Clean up the bottom footer layout
            footer: "hidden" 
          }
        }}
      />
    </div>
  )
}