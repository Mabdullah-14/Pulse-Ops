import React, { useState } from 'react'
import { Building2, Crown, Users, Plus, Shield, KanbanSquare, History } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGetUserOrgs } from '../hooks/queries/organization/usegetUserOrgs'
import OrgCard from '../components/organizations/Organizationcard'
import CreateOrgModal from '../components/organizations/CreateOrgModal'

const Home = () => {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, error } = useGetUserOrgs()
  const organizations = data?.data || []

  // Existing data se stats nikalna
    const ownedCount = organizations.filter(
      (org) => org.role?.toLowerCase() === 'owner'
    ).length
    const memberCount = organizations.length - ownedCount

  return (
    <div className="min-h-screen bg-gray-50/70">
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Top Welcome Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'Developer'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Select a workspace to manage projects, custom roles, and audit activity.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition cursor-pointer shrink-0"
          >
            <Plus size={16} />
            Create Organization
          </button>
        </div>

        {/* Summary Stats Row */}
        {!isLoading && !isError && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Total Workspaces</p>
                <p className="text-xl font-bold text-gray-900">{organizations.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-purple-50 text-purple-600">
                <Crown size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Owned by You</p>
                <p className="text-xl font-bold text-gray-900">{ownedCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Joined as Member</p>
                <p className="text-xl font-bold text-gray-900">{memberCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Your Organizations
          </h2>
        </div>

        {isLoading && (
          <div className="py-12 text-center text-sm text-gray-500">Loading workspaces...</div>
        )}

        {isError && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error?.message || 'Failed to load organizations'}
          </div>
        )}

        {!isLoading && !isError && organizations.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">No organizations yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your first workspace to get started with PulseOps.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              + Create Organization
            </button>
          </div>
        )}

        {!isLoading && !isError && organizations.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}

            {/* Balanced Dashed Add Card */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white/60 p-5 text-gray-500 transition hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 cursor-pointer"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100">
                <Plus size={20} />
              </div>
              <span className="text-sm font-semibold">Create New Workspace</span>
              <span className="text-xs text-gray-400">Set up a new team & board</span>
            </button>
          </div>
        )}

        {/* Bottom Workspace Guide Strip */}
        {/* <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            How PulseOps Works
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3.5">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <KanbanSquare size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">1. Projects & Kanban Boards</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Organize tasks across custom workflow columns and track issue priorities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3.5">
              <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                <Shield size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">2. Dynamic Roles & PBAC</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Create custom roles and control granular access for every team member.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3.5">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                <History size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">3. Complete Audit Trail</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Monitor every workspace change, role update, and member activity in real time.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </main>

      <CreateOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Home
