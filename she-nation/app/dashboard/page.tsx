import { AuthGuard } from "@/components/auth/auth-guard"
import { RoleBasedDashboard } from "@/components/dashboard/role-based-dashboard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="max-w-7xl w-full">
          <RoleBasedDashboard />
        </div>
      </div>
    </AuthGuard>
  )
}
