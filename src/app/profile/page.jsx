"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function ProfilePage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "My Profile | MediQueue";
  }, []);

  return (
    <PrivateRoute>
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="border dark:border-gray-700 rounded-2xl p-8 text-center">
          <img
            src={user?.image || "https://i.ibb.co/2Y6h6qh/default-avatar.png"}
            alt={user?.name}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-4 border-green-600"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 text-left text-sm">
            <div className="flex justify-between border-t dark:border-gray-700 pt-3">
              <span className="text-gray-500">Full Name</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {user?.name}
              </span>
            </div>
            <div className="flex justify-between border-t dark:border-gray-700 pt-3">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}