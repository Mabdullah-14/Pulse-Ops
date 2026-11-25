import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ShieldCheck } from 'lucide-react'

const OrgCard = ({ org }) => {
  const initial = org.name?.charAt(0)?.toUpperCase() || 'W'


  return (
    <Link
      to={`/orgs/${org.slug}/projects`}
      className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:border-blue-400 hover:shadow-md"
    >
      <div>
        {/* Top Row: Avatar + Role Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-xs">
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-blue-600 transition">
                {org.name}
              </h3>

            </div>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-blue-600 border border-blue-100">
            {org.role || 'Member'}
          </span>
        </div>

        {/* Meta Info: Permissions & Joined Date */}
        <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
          {/* <span className="inline-flex items-center gap-1">
            <ShieldCheck size={14} className="text-blue-500" />
            {permCount} permissions
          </span> */}
          {org.joinedAt && (
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} className="text-gray-400" />
              {new Date(org.joinedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-semibold text-blue-600">
        <span>Open Workspace</span>
        <ArrowRight
          size={14}
          className="transition-transform duration-150 group-hover:translate-x-1"
        />
      </div>
    </Link>
  )
}

export default OrgCard
