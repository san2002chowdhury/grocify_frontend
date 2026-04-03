import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/features/contact/contactThunk";

const ContactPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.contact?.loading);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "*Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "*Invalid email format!";
    }

    if (!formData.message.trim()) {
      newErrors.message = "*Message is required!";
    }

    if (!formData.name.trim()) {
      newErrors.name = "*Name is required!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    dispatch(sendMessage(formData))
      .unwrap()
      .then((result) => console.log(result))
      .catch(() => {})
      .finally(() =>
        setFormData({
          name: "",
          email: "",
          message: "",
        }),
      );
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-10">Contact Us</h1>

        {/* CONTACT SECTION */}

        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-xl">
          {/* CONTACT INFO */}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Get in Touch</h2>

            <p className="text-gray-600">
              If you have any questions about orders or products feel free to
              contact us.
            </p>

            <div>
              <p className="font-medium">📍 Address</p>
              <p className="text-gray-600">Madhyamgram, West Bengal, India</p>
            </div>

            <div>
              <p className="font-medium">📞 Phone</p>
              <p className="text-gray-600">+91 9038417823</p>
            </div>

            <div>
              <p className="font-medium">📧 Email</p>
              <p className="text-gray-600">support@groceryapp.com</p>
            </div>
          </div>

          {/* CONTACT FORM */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg outline-none focus:border-primary"
            />

            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.name || ""}
            </p>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg outline-none focus:border-primary"
            />
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.email || ""}
            </p>

            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg outline-none focus:border-primary"
            />
            <p className="text-red-500 text-xs min-h-[18px] mt-1">
              {errors.message || ""}
            </p>
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg 
              ${
                loading
                  ? "bg-dull cursor-not-allowed"
                  : "bg-primary hover:bg-dull transition"
              }`}
            >
              {loading ? "Please wait..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* MAP SECTION */}

        <div className="mt-10 rounded-xl overflow-hidden shadow">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Madhyamgram%20West%20Bengal&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
