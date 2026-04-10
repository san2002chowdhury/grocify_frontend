import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../constants/api";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}newsletter/subscribe`, { email });
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail("");
      }
    } catch (e) {
      toast.error(e.res.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-16">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`md:px-12 px-8 h-full text-white rounded-md rounded-l-none transition-all
            ${loading ? "bg-dull cursor-not-allowed" : "bg-primary hover:bg-dull cursor-pointer"}`}
        >
          {loading ? "Wait..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
