"use client";
import {
  Monitor,
  HardDrive,
  Cpu,
  Search,
  Plus,
  Trash2,
  Edit,
  X,
  Bot,
  Send,
  Lock,
  UserCheck,
  LogOut,
  Shield,
} from "lucide-react";
import { User } from "../../types";
interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: "dashboard" | "equipment" | "ai") => void;
  onLogout: () => void;
}
export function Header({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Monitor className="h-8 w-8" />
          <h1 className="text-xl font-bold">IT Equipment Manager</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "equipment" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === "ai" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
          
            <Bot className="h-8 w-8" />
            AI Assistant
          </button>
          <div className="flex items-center gap-2">
          <UserCheck className="h-8 w-8" />
            <p className="text-sm font-medium">{currentUser?.name} </p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
