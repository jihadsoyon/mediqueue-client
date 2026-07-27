"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/shared/PrivateRoute";
import Spinner from "@/components/shared/Spinner";
import toast from "react-hot-toast";

export default function MyBookedSessionsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/bookings/my-bookings");
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load your booked sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancel = async () => {
    try {
      await axiosInstance.patch(`/bookings/${cancelTarget._id}/cancel`);
      toast.success("Booking cancelled");
      setCancelTarget(null);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          My Booked Sessions
        </h1>

        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 border dark:border-gray-700 rounded-xl">
            <p className="text-gray-500">You haven't booked any sessions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border dark:border-gray-700 rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">Tutor Name</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-3">{booking.tutorName}</td>
                    <td className="px-4 py-3">{booking.studentName}</td>
                    <td className="px-4 py-3">{booking.studentEmail}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {booking.status !== "Cancelled" && (
                        <button
                          onClick={() => setCancelTarget(booking)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cancelTarget && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm text-center">
              <h2 className="text-lg font-bold mb-2">Cancel Booking</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to cancel this session?
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setCancelTarget(null)} className="px-4 py-2 border dark:border-gray-700 rounded-lg">
                  Keep it
                </button>
                <button onClick={handleCancel} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}