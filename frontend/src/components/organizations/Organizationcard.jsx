import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'

const OrgCard = ({ org }) => {
  const initial = org.name?.charAt(0)?.toUpperCase() || 'W'

  return (
    <Link
      to={`/orgs/${org.slug}/projects`}
      className="group flex min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md sm:p-5"
    >
      <div className="min-w-0">
        {/* Top Row: Avatar + Role Badge */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-xs sm:h-11 sm:w-11 sm:text-base">
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-gray-900 transition group-hover:text-blue-600 sm:text-base">
                {org.name}
              </h3>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-blue-600">
            {org.role || 'Member'}
          </span>
        </div>

        {/* Meta Info: Joined Date */}
        {org.joinedAt && (
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 sm:mt-5">
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} className="shrink-0 text-gray-400" />
              {new Date(org.joinedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-semibold text-blue-600 sm:mt-5">
        <span>Open Workspace</span>
        <ArrowRight
          size={14}
          className="shrink-0 transition-transform duration-150 group-hover:translate-x-1"
        />
      </div>
    </Link>
  )
}

export default OrgCard