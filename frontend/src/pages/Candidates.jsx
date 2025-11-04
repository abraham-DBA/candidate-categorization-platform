import { useState, useEffect } from "react";
import Table from "../components/CandidatesTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const columns = ["Name", "Email", "Skills", "Tier", "Date"];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates/get-candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Filter candidates by search and tier
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchesTier =
      tierFilter === "All" || c.tier === parseInt(tierFilter.replace("Tier ", ""));

    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Candidates Overview</h1>
      <p className="text-gray-600">Manage your candidates here.</p>

      {/* Search, Filter & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
          >
            <option value="All">All Tiers</option>
            <option value="Tier 0">Tier 0</option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
            <option value="Tier 4">Tier 4</option>
          </select>
        </div>

        <button
          onClick={() => navigate('/register-candidate')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Candidate
        </button>
      </div>

      {/* Candidates Table */}
      {loading ? (
        <p className="text-gray-600 mt-4">Loading candidates...</p>
      ) : (
        <Table data={filteredCandidates} columns={columns} />
      )}
    </div>
  );
};

export default Candidates;
