import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    technology: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^[6-9]\d{9}$/.test(value);

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, emailOrPhone, technology, description } = formData;

    if (!isEmail(emailOrPhone) && !isPhone(emailOrPhone)) {
      alert("Please enter a valid email or 10-digit Indian phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccessMsg("✅ Submitted! We’ll get back to you within 24 hours.");
        setFormData({ name: "", emailOrPhone: "", technology: "", description: "" });

        // ✅ Trigger WhatsApp message only if phone number
        if (isPhone(emailOrPhone)) {
          const message = `Hi, I just submitted a request on itjobsupport.com. My name is ${name}, and I need support for ${technology}.`;
          window.open(`https://wa.me/91${emailOrPhone}?text=${encodeURIComponent(message)}`, "_blank");
        }

        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2s
      } else {
        alert("Something went wrong. Try again later.");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Request Support</h2>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-bounce" role="alert">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="emailOrPhone" placeholder="Email or Phone" value={formData.emailOrPhone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="technology" placeholder="Technology" value={formData.technology} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Brief Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
