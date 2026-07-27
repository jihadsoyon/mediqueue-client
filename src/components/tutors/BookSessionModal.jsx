"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/api";

export default function BookSessionModal({ tutor, onClose, onBooked }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const booking = {
      tutorId: tutor._id,
      studentName: form.studentName.value,
      studentPhone: form.studentPhone.value,
    };

    try {
      await axiosInstance.post("/bookings", booking);
      toast.success("Session booked successfully! Your digital token has been generated.");
      onBooked();
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to book session";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book Session with {tutor.tutorName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student Name</label>
            <input
              name="studentName"
              defaultValue={user?.name || ""}
              required
              className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="studentPhone"
              required
              className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border dark:border-gray-700 rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}