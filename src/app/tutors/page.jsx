"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import TutorCard from "@/components/tutors/TutorCard";
import Spinner from "@/components/shared/Spinner";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await axiosInstance.get("/tutors", { params });
      setTutors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        All Tutors
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Search tutor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Search
        </button>
      </form>

      {loading ? (
        <Spinner />
      ) : tutors.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}