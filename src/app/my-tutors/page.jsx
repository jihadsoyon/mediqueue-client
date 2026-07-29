"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/shared/PrivateRoute";
import Spinner from "@/components/shared/Spinner";
import toast from "react-hot-toast";

export default function MyTutorsPage() {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);

  const fetchMyTutors = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/tutors/my-tutors");
      setTutors(res.data);
    } catch (error) {
      toast.error("Failed to load your tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      tutorName: form.tutorName.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
    };

    try {
      await axiosInstance.patch(`/tutors/${editTutor._id}`, updated);
      toast.success("Tutor updated successfully!");
      setEditTutor(null);
      fetchMyTutors();
    } catch (error) {
      toast.error("Failed to update tutor");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tutors/${deleteTutor._id}`);
      toast.success("Tutor deleted successfully!");
      setDeleteTutor(null);
      fetchMyTutors();
    } catch (error) {
      toast.error("Failed to delete tutor");
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          My Added Tutors
        </h1>

        {loading ? (
          <Spinner />
        ) : tutors.length === 0 ? (
          <div className="text-center py-16 border dark:border-gray-700 rounded-xl">
            <p className="text-gray-500">You havent added any tutors yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border dark:border-gray-700 rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">Tutor</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Fee (৳)</th>
                  <th className="px-4 py-3">Slots</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tutors.map((tutor) => (
                  <tr key={tutor._id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-3">{tutor.tutorName}</td>
                    <td className="px-4 py-3">{tutor.subject}</td>
                    <td className="px-4 py-3">{tutor.hourlyFee}</td>
                    <td className="px-4 py-3">{tutor.totalSlot}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button onClick={() => setEditTutor(tutor)} className="text-blue-600 hover:underline text-sm">
                        Edit
                      </button>
                      <button onClick={() => setDeleteTutor(tutor)} className="text-red-600 hover:underline text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editTutor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Tutor</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tutor Name</label>
                  <input name="tutorName" defaultValue={editTutor.tutorName} required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hourly Fee ($)</label>
                  <input name="hourlyFee" type="number" defaultValue={editTutor.hourlyFee} required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Slots</label>
                  <input name="totalSlot" type="number" defaultValue={editTutor.totalSlot} required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={() => setEditTutor(null)} className="px-4 py-2 border dark:border-gray-700 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteTutor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm text-center">
              <h2 className="text-lg font-bold mb-2">Delete Tutor</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this tutor? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setDeleteTutor(null)} className="px-4 py-2 border dark:border-gray-700 rounded-lg">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}