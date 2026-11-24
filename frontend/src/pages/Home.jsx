import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetUserOrgs } from "../hooks/queries/organization/usegetUserOrgs";
import OrgCard from "../components/organizations/Organizationcard";
import CreateOrgModal from "../components/organizations/CreateOrgModal";


const Home = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetUserOrgs();
  const organizations = data?.data || [];



  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Organizations</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a workspace to manage boards and team members.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + Create Organization
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-12 text-gray-500">Loading workspaces...</div>
        )}

        {isError && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error?.message || "Failed to load organizations"}
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
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + Create Organization
            </button>
          </div>
        )}

        {!isLoading && !isError && organizations.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        )}
      </main>

      <CreateOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;