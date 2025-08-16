

import React, { useEffect, useState } from "react";
import { useAdminContext } from "../context/shopcontext";

const AdminFeedback = () => {
  const { getAllFeedback } = useAdminContext();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const data = await getAllFeedback();
        setFeedbackList(Array.isArray(data) ? data : []);
      } catch (err) {
        setFetchError("Unable to fetch feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [getAllFeedback]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
        📬 Feedback Dashboard
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
            />
          </svg>
        </div>
      ) : fetchError ? (
        <p className="text-center text-red-500">{fetchError}</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-lg text-gray-500 text-center">
          No feedback available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackList.map((item) => (
            <div
              key={item._id}
              className="p-6 bg-gradient-to-br from-white via-slate-50 to-gray-100 border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Name with icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A4.992 4.992 0 0012 20a4.992 4.992 0 006.879-2.196M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              </div>

              {/* Email badge */}
              <div className="mb-3">
                <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                  {item.email}
                </span>
              </div>

              {/* Message content */}
              <blockquote className="relative pl-4 border-l-4 border-blue-400 text-gray-700 italic mb-4">
                “{item.message}”
              </blockquote>

              {/* Date */}
              <div className="text-right text-xs text-gray-500">
                Submitted on: {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminFeedback;
