import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Admin login required");
      window.location.href = "/admin";
      return;
    }
   console.log("Bearer token:", localStorage.getItem("adminToken"));
    fetch("http://localhost:8080/api/leads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized - invalid or expired token");
          } else if (res.status === 403) {
            throw new Error("Forbidden - insufficient access");
          } else {
            throw new Error(`Error ${res.status}`);
          }
        }
        return res.json();
      })
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch leads:", err.message);
        alert("Access denied or network error");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Submitted Leads</h2>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email/Phone</th>
              <th className="border p-2">Technology</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td className="border p-2">{lead.name}</td>
                <td className="border p-2">{lead.emailOrPhone}</td>
                <td className="border p-2">{lead.technology}</td>
                <td className="border p-2">{lead.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}