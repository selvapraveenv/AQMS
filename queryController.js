import supabase from '../config/supabaseClient.js';

// GET /api/queries
export const getQueries = async (req, res) => {
    const { page = 1, limit = 10, status, category, priority, team, search } = req.query;
    const startIndex = (page - 1) * limit;

    try {
        let query = supabase
            .from('queries')
            .select(`
                *,
                team:teams(name),
                brand:brands(name)
            `, { count: 'exact' });

        // Apply filters
        if (status && status !== 'All') query = query.eq('status', status);
        if (category && category !== 'All') query = query.eq('category', category);
        if (priority && priority !== 'All') query = query.eq('priority', priority);
        if (team && team !== 'All') query = query.eq('team_id', team);
        if (search) query = query.ilike('msg', `%${search}%`);

        // Apply pagination
        query = query.range(startIndex, startIndex + limit - 1);

        const { data, error, count } = await query;

        if (error) throw error;

        res.json({
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalItems: count,
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching queries: ${error.message}` });
    }
};

// ADD THIS NEW FUNCTION
export const getQueryById = async (req, res) => {
  const { id } = req.params;
  try {
    // This special select statement fetches the query AND all its related history_entries
    const { data, error } = await supabase
      .from('queries')
      .select('*, history_entries(*)')
      .eq('id', id)
      .single(); // .single() ensures we get one object, not an array

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Query not found" });

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /api/queries/:id/status
export const updateQueryStatus = async (req, res) => {
    const { status } = req.body;
    try {
        // Step 1: Update the query status
        const { data: updatedQuery, error: updateError } = await supabase
            .from('queries')
            .update({ status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (updateError) throw updateError;

        // Step 2: Create a history entry
        const action = `Status changed to ${status}`;
        await supabase.from('history_entries').insert({
            query_id: req.params.id,
            action: action,
            agent: req.user.email // User from protect middleware
        });

        res.json(updatedQuery);
    } catch (error) {
        res.status(500).json({ message: `Error updating status: ${error.message}` });
    }
};
