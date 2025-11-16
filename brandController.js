// backend/controllers/brandController.js

import supabase from '../config/supabaseClient.js';

// A helper function to generate realistic mock data for a new brand
const generateMockQueriesForBrand = (brandId, teamMap) => {
  const queries = [
    { sender: 'Alice M.', msg: 'My order hasn’t arrived yet, can you please check the status? This is urgent.', channel: 'Email', category: 'Complaint', priority: 'High', team_id: teamMap['Crisis Team'] },
    { sender: 'Bob Johnson', msg: 'Just wanted to say your new product line is amazing! Great work.', channel: 'Instagram', category: 'Feedback', priority: 'Low', team_id: teamMap['General Team'] },
    { sender: 'Charlie Brown', msg: 'The login button on the app is not working for me. It just spins.', channel: 'Chat', category: 'Bug Report', priority: 'Medium', team_id: teamMap['Support Team'] },
    { sender: 'Diana Prince', msg: 'When will the summer collection be available in Canada?', channel: 'Facebook', category: 'Question', priority: 'Low', team_id: teamMap['General Team'] },
    { sender: 'Ethan Hunt', msg: 'I was charged twice for my last purchase. I need a refund immediately!', channel: 'Email', category: 'Complaint', priority: 'High', team_id: teamMap['Crisis Team'] },
  ];
  // Associate each query with the new brand
  return queries.map(q => ({ ...q, brand_id: brandId }));
};


// Corresponds to: POST /api/brands/connect
export const connectBrand = async (req, res) => {
  const { brandName } = req.body;
  if (!brandName) {
    return res.status(400).json({ message: 'Brand name is required.' });
  }

  try {
    // To assign queries correctly, we need the IDs of our teams
    const { data: teams, error: teamsError } = await supabase.from('teams').select('id, name');
    if (teamsError) throw teamsError;
    
    // Create a map of team names to IDs for easy lookup
    const teamMap = teams.reduce((acc, team) => {
      acc[team.name] = team.id;
      return acc;
    }, {});


    // 1. Create the new brand in the 'brands' table
    const { data: newBrand, error: brandError } = await supabase
      .from('brands')
      .insert({ name: brandName })
      .select()
      .single(); // .single() returns the created object

    if (brandError) throw brandError;


    // 2. SIMULATE SCRAPING: Generate a set of mock queries for this brand
    const newQueries = generateMockQueriesForBrand(newBrand.id, teamMap);


    // 3. Insert the new queries into the 'queries' table
    const { error: queryError } = await supabase.from('queries').insert(newQueries);
    if (queryError) throw queryError;


    // 4. Respond with the newly created brand object
    res.status(201).json(newBrand);

  } catch (error) {
    console.error("Error connecting brand:", error);
    res.status(500).json({ message: error.message });
  }
};