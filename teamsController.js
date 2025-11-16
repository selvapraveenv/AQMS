// backend/controllers/teamsController.js (AFTER - CORRECTED)

import supabase from '../config/supabaseClient.js';

// Define the Priority constants directly in the file
// This makes the backend independent from the frontend's type definitions.
const Priority = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

// In a real app, member data would come from a 'profiles' or 'users' table.
// For now, we'll hardcode it to match the old mock data.
const TEAMS_MEMBERS = [
  { name: 'Crisis Agent 1', team: 'Crisis Team' },
  { name: 'Support Agent 1', team: 'Support Team' },
  { name: 'General Agent 1', team: 'General Team' },
];

// Corresponds to: GET /api/teams/overview
export const getTeamsOverview = async (req, res) => {
  try {
    // 1. Fetch all teams and all queries from the database
    const { data: teams, error: teamsError } = await supabase.from('teams').select('id, name');
    if (teamsError) throw teamsError;

    const { data: queries, error: queriesError } = await supabase.from('queries').select('team_id, priority');
    if (queriesError) throw queriesError;

    // 2. Calculate the workload for each team
    const overviewData = teams.map(team => {
      const teamQueries = queries.filter(q => q.team_id === team.id);
      const teamMembersCount = TEAMS_MEMBERS.filter(m => m.team === team.name).length;

      const workload = {
        [Priority.HIGH]: teamQueries.filter(q => q.priority === Priority.HIGH).length,
        [Priority.MEDIUM]: teamQueries.filter(q => q.priority === Priority.MEDIUM).length,
        [Priority.LOW]: teamQueries.filter(q => q.priority === Priority.LOW).length,
      };

      return {
        team: team.name,
        members: teamMembersCount,
        workload,
        total: teamQueries.length,
      };
    });

    res.status(200).json({ overview: overviewData, members: TEAMS_MEMBERS });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};