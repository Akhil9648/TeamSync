import React, { useEffect, useState } from "react";

export default function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/team/my-teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (err) {
        console.error("Failed to fetch teams", err);
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Teams...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Teams</h1>

      {teams.length === 0 ? (
        <p>You are not part of any team.</p>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <p className="text-sm text-gray-600">
                Leader: {team.leader?.name}
              </p>
              <p className="text-sm text-gray-500">
                Members: {team.members?.length}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
