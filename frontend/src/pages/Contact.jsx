

import React, { useState } from "react";
import { useAppContext } from "../context/Shopcontext";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const { submitFeedback, user } = useAppContext();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFeedback(form);
      
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        🌟 Share Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-gray-600">
            Your Feedback
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what you think..."
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              Submitting...
            </>
          ) : (
            <>
              <span>✉️</span> Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;