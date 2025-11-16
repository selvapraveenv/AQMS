// pages/TeamsPage.tsx (Corrected Version with Loading/Error Handling)

import React, { useEffect, useState } from 'react';
import { Team, Priority, TeamMember } from '../types';
import Icon from '../components/Icon';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';

// Helper to create authenticated API client
const createApi = (token: string) => {
  return axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${token}` }
  });
};

interface TeamData {
  team: Team;
  members: number;
  workload: Record<Priority, number>;
  total: number;
}

const TeamCard: React.FC<TeamData> = ({ team, members, workload, total }) => (
    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <Icon name="users" className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{team}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{members} members</p>
            </div>
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Assigned Queries</span>
                <span className="font-bold text-gray-800 dark:text-white">{total}</span>
            </div>
             <hr className="dark:border-gray-700/50 my-2" />
            <div className="flex justify-between items-center">
                <span className="font-medium text-danger">High Priority</span>
                <span className="font-semibold text-danger">{workload[Priority.HIGH]}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-medium text-warning">Medium Priority</span>
                <span className="font-semibold text-warning">{workload[Priority.MEDIUM]}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-500 dark:text-gray-400">Low Priority</span>
                <span className="font-semibold text-gray-600 dark:text-gray-300">{workload[Priority.LOW]}</span>
            </div>
        </div>
    </div>
);

const TeamsPage: React.FC = () => {
    // *** KEY CHANGE: Initialize state correctly ***
    const [teamData, setTeamData] = useState<TeamData[]>([]);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true); // Start in a loading state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setLoading(false);
                    return; // Don't fetch if not logged in
                };

                const api = createApi(session.access_token);
                // This calls GET http://localhost:5000/api/teams/overview
                const response = await api.get('/teams/overview');
                
                // Ensure data is an array before setting state
                setTeamData(Array.isArray(response.data.overview) ? response.data.overview : []);
                setMembers(Array.isArray(response.data.members) ? response.data.members : []);
            } catch (err) {
                console.error("Failed to fetch team data:", err);
                setError("Could not load team data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    // *** NEW RENDERING LOGIC ***
    if (loading) {
        return <div className="text-center p-8">Loading team data...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-danger">Error: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Team Overview & Workload</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData.map(data => (
                    <TeamCard key={data.team} {...data} />
                ))}
            </div>
             <div className="bg-white dark:bg-dark rounded-lg shadow mt-8">
                <div className="p-4 border-b dark:border-gray-700/50">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">All Members</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Member Name</th>
                                <th scope="col" className="px-6 py-3">Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length > 0 ? (
                                members.map((member, index) => (
                                    <tr key={index} className="bg-white dark:bg-dark border-b dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-now-wrap dark:text-white">{member.name}</td>
                                        <td className="px-6 py-4">{member.team}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="text-center py-10 text-gray-500 dark:text-gray-400">
                                        No members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamsPage;