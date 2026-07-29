"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/api";
import PrivateRoute from "@/components/shared/PrivateRoute";
import Spinner from "@/components/shared/Spinner";
import BookSessionModal from "@/components/tutors/BookSessionModal";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchTutor = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/tutors/${id}`);
      setTutor(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner />;
  if (!tutor) return <p className="text-center py-16">Tutor not found.</p>;

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={tutor.photoURL}
            alt={tutor.tutorName}
            className="w-full md:w-64 h-64 object-cover rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {tutor.tutorName}
            </h1>
            <p className="text-green-600 font-medium mt-1">{tutor.subject}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
              $ {tutor.hourlyFee} / hour
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-500">Institution</p>
                <p className="font-medium">{tutor.institution}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium">{tutor.experience}</p>
              </div>
              <div>
                <p className="text-gray-500">Available</p>
                <p className="font-medium">{tutor.availableDays}, {tutor.availableTimeSlot}</p>
              </div>
              <div>
                <p className="text-gray-500">Session Start Date</p>
                <p className="font-medium">{tutor.sessionStartDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Available Slots</p>
                <p className="font-medium">{tutor.totalSlot}</p>
              </div>
              <div>
                <p className="text-gray-500">Teaching Mode</p>
                <p className="font-medium">{tutor.teachingMode}</p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookSessionModal
          tutor={tutor}
          onClose={() => setShowModal(false)}
          onBooked={fetchTutor}
        />
      )}
    </PrivateRoute>
  );
}