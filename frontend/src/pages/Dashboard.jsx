import Table from "../components/CandidatesTable";

const Dashboard = () => {
  const totalCandidates = 120;
  const tierCounts = [15, 25, 30, 20, 30];

  const tiers = [
    { name: "Tier 0 - Beginner", count: tierCounts[0], color: "bg-blue-100", textColor: "text-blue-700" },
    { name: "Tier 1 - CRUD Developer", count: tierCounts[1], color: "bg-green-100", textColor: "text-green-700" },
    { name: "Tier 2 - Full-Stack", count: tierCounts[2], color: "bg-yellow-100", textColor: "text-yellow-700" },
    { name: "Tier 3 - Multi-Framework", count: tierCounts[3], color: "bg-orange-100", textColor: "text-orange-700" },
    { name: "Tier 4 - Advanced Full-Stack", count: tierCounts[4], color: "bg-red-100", textColor: "text-red-700" },
  ];

  // Dummy data for recently added candidates
  const recentCandidates = [
    { name: "Alice Johnson", email: "alice@example.com", tier: "Tier 2", date: "2025-11-01" },
    { name: "Bob Smith", email: "bob@example.com", tier: "Tier 1", date: "2025-11-02" },
    { name: "Charlie Brown", email: "charlie@example.com", tier: "Tier 0", date: "2025-11-03" },
    { name: "Diana Prince", email: "diana@example.com", tier: "Tier 3", date: "2025-11-03" },
    { name: "Evan Lee", email: "evan@example.com", tier: "Tier 4", date: "2025-11-04" },
  ];

  const columns = ["Name", "Email", "Tier", "Date Added"];

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
        <Table data={recentCandidates} columns={columns} />
      </div>
    </div>
  );
};

export default Dashboard;
