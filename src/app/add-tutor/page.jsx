"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/api";
import PrivateRoute from "@/components/shared/PrivateRoute";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "ICT"];

export default function AddTutorPage() {
  const router = useRouter();
  const [sessionStartDate, setSessionStartDate] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;

    const tutor = {
      tutorName: form.tutorName.value,
      photoURL: form.photoURL.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      availableTimeSlot: form.availableTimeSlot.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
      sessionStartDate: sessionStartDate.toISOString().split("T")[0],
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
    };

    try {
      await axiosInstance.post("/tutors", tutor);
      toast.success("Tutor added successfully!");
      form.reset();
      router.push("/my-tutors");
    } catch (error) {
      toast.error("Failed to add tutor. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Add New Tutor
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Tutor Name</label>
            <input name="tutorName" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input name="photoURL" type="url" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject / Category</label>
            <select name="subject" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent">
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teaching Mode</label>
            <select name="teachingMode" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Available Days</label>
            <input name="availableDays" placeholder="e.g. Sun - Thu" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Available Time Slot</label>
            <input name="availableTimeSlot" placeholder="e.g. 5:00 PM - 8:00 PM" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hourly Fee (৳)</label>
            <input name="hourlyFee" type="number" min="0" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Slots</label>
            <input name="totalSlot" type="number" min="1" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Session Start Date</label>
            <DatePicker
              selected={sessionStartDate}
              onChange={(date) => setSessionStartDate(date)}
              dateFormat="yyyy-MM-dd"
              wrapperClassName="w-full"
              className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Institution</label>
            <input name="institution" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <input name="experience" placeholder="e.g. 5+ Years" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location (Area/City)</label>
            <input name="location" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Tutor"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}