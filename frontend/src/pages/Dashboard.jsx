import { useEffect, useState } from "react";
import Table from "../components/CandidatesTable";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tierCounts, setTierCounts] = useState([0, 0, 0, 0, 0]);

  const columns = ["Name", "Email", "Tier", "Date Added"];

  // Fetch candidates from backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/candidates/get-candidates");
        const data = await res.json();
        setCandidates(data);

        // Count candidates by tier
        const counts = [0, 0, 0, 0, 0];
        data.forEach((c) => {
          if (c.tier >= 0 && c.tier <= 4) counts[c.tier]++;
        });
        setTierCounts(counts);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Sort and slice to get last 5 candidates
  const recentCandidates = [...candidates]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((c) => ({
      name: c.name,
      email: c.email,
      tier: `Tier ${c.tier}`,
      date: new Date(c.createdAt).toLocaleDateString(),
    }));

  const totalCandidates = candidates.length;

  const tiers = [
    { name: "Tier 0 - Beginner", count: tierCounts[0], color: "bg-blue-100", textColor: "text-blue-700" },
    { name: "Tier 1 - CRUD Developer", count: tierCounts[1], color: "bg-green-100", textColor: "text-green-700" },
    { name: "Tier 2 - Full-Stack", count: tierCounts[2], color: "bg-yellow-100", textColor: "text-yellow-700" },
    { name: "Tier 3 - Multi-Framework", count: tierCounts[3], color: "bg-orange-100", textColor: "text-orange-700" },
    { name: "Tier 4 - Advanced Full-Stack", count: tierCounts[4], color: "bg-red-100", textColor: "text-red-700" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your dashboard!</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Candidates Card */}
        <div className="bg-indigo-100 text-indigo-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Total Candidates</p>
          <p className="text-3xl font-bold mt-2">{totalCandidates}</p>
        </div>

        {/* Tier Cards */}
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`${tier.color} ${tier.textColor} p-6 rounded-lg shadow-md flex flex-col items-center justify-center`}
          >
            <p className="text-md font-semibold text-center">{tier.name}</p>
            <p className="text-2xl font-bold mt-2">{tier.count}</p>
          </div>
        ))}
      </div>

      {/* Recently Added Candidates Table */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Added Candidates</h2>
        {loading ? (
          <p className="text-gray-600">Loading recent candidates...</p>
        ) : (
          <Table data={recentCandidates} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
