import React, { useState } from 'react'
import { Building2, Crown, Users, Plus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGetUserOrgs } from '../hooks/queries/organization/usegetUserOrgs'
import OrgCard from '../components/organizations/Organizationcard'
import CreateOrgModal from '../components/organizations/CreateOrgModal'
import { HomeSkeleton } from '../components/skeletons/HomeSkeleton'

const Home = () => {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, error } = useGetUserOrgs()
  const organizations = data?.data || []

  const ownedCount = organizations.filter(
    (org) => org.role?.toLowerCase() === 'owner'
  ).length
  const memberCount = organizations.length - ownedCount

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50/70">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Top Welcome Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
              Welcome back, {user?.name || 'Developer'}
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Select a workspace to manage projects, custom roles, and audit activity.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={16} />
            Create Organization
          </button>
        </div>

        {isLoading && <HomeSkeleton />}

        {isError && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error?.message || 'Failed to load organizations'}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {/* Summary Stats Row */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs sm:gap-4 sm:p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Building2 size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-500">Total Workspaces</p>
                  <p className="text-lg font-bold text-gray-900 sm:text-xl">{organizations.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs sm:gap-4 sm:p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-purple-50 text-purple-600">
                  <Crown size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-500">Owned by You</p>
                  <p className="text-lg font-bold text-gray-900 sm:text-xl">{ownedCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs sm:gap-4 sm:p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Users size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-500">Joined as Member</p>
                  <p className="text-lg font-bold text-gray-900 sm:text-xl">{memberCount}</p>
                </div>
              </div>
            </div>

            {/* Section Heading */}
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:text-sm">
                Your Organizations
              </h2>
            </div>

            {organizations.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center sm:p-12">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  No organizations yet
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Create your first workspace to get started with PulseOps.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                >
                  <Plus size={16} />
                  Create Organization
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {organizations.map((org) => (
                  <OrgCard key={org.id} org={org} />
                ))}

                {/* Balanced Dashed Add Card */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white/60 p-5 text-gray-500 transition hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 sm:min-h-[168px]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100">
                    <Plus size={20} />
                  </div>
                  <span className="text-sm font-semibold">Create New Workspace</span>
                  <span className="text-xs text-gray-400">Set up a new team & board</span>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <CreateOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Home