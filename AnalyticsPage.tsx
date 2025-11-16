import React, { useMemo, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQueries } from '../context/QueryContext';
import { Category, Priority, Channel, Team, Query } from '../types';
import Icon from '../components/Icon';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, icon, change, changeType }) => (
    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Icon name={icon} className="w-6 h-6" />
            </div>
        </div>
        {change && (
            <p className={`mt-2 text-xs ${changeType === 'increase' ? 'text-success' : 'text-danger'}`}>
                {change} vs last period
            </p>
        )}
    </div>
);


const AnalyticsPage: React.FC = () => {
    const { queries } = useQueries();
    const [filters, setFilters] = useState({
        category: 'All',
        priority: 'All',
        team: 'All',
        channel: 'All'
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredQueries = useMemo(() => {
        return queries.filter(q => 
            (filters.category === 'All' || q.category === filters.category) &&
            (filters.priority === 'All' || q.priority === filters.priority) &&
            (filters.team === 'All' || q.team === filters.team) &&
            (filters.channel === 'All' || q.channel === filters.channel)
        );
    }, [queries, filters]);

    const analyticsData = useMemo(() => {
        const totalQueries = filteredQueries.length;
        const queriesByPriority = filteredQueries.reduce((acc, q) => {
            acc[q.priority] = (acc[q.priority] || 0) + 1;
            return acc;
        }, {} as Record<Priority, number>);

        const queriesByCategory = Object.values(Category).map(cat => ({
            name: cat,
            count: filteredQueries.filter(q => q.category === cat).length,
        })).filter(c => c.count > 0);
        
        const teamWorkload = Object.values(Team).map(team => ({
            name: team,
            value: filteredQueries.filter(q => q.team === team).length
        })).filter(t => t.value > 0);

        const queriesOverTime = filteredQueries.reduce((acc, q) => {
            const date = new Date(q.timestamp).toLocaleDateString('en-CA'); // YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const timeData = Object.entries(queriesOverTime)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
            totalQueries,
            highPriority: queriesByPriority[Priority.HIGH] || 0,
            mediumPriority: queriesByPriority[Priority.MEDIUM] || 0,
            lowPriority: queriesByPriority[Priority.LOW] || 0,
            categoryDistribution: queriesByCategory,
            teamWorkload,
            timeData
        };
    }, [filteredQueries]);

    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#818cf8', '#6b7280'];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-dark p-4 rounded-lg shadow">
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Analytics Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 border rounded-lg bg-light text-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <option value="All">All Categories</option>
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select name="priority" value={filters.priority} onChange={handleFilterChange} className="w-full p-2 border rounded-lg bg-light text-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <option value="All">All Priorities</option>
                        {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select name="team" value={filters.team} onChange={handleFilterChange} className="w-full p-2 border rounded-lg bg-light text-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <option value="All">All Teams</option>
                        {Object.values(Team).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select name="channel" value={filters.channel} onChange={handleFilterChange} className="w-full p-2 border rounded-lg bg-light text-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <option value="All">All Channels</option>
                        {Object.values(Channel).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Queries" value={analyticsData.totalQueries} icon="inbox" />
                <StatCard title="High Priority" value={analyticsData.highPriority} icon="bolt" />
                <StatCard title="Medium Priority" value={analyticsData.mediumPriority} icon="bolt" />
                <StatCard title="Low Priority" value={analyticsData.lowPriority} icon="bolt" />
            </div>

            <div className="bg-white dark:bg-dark p-6 rounded-lg shadow">
                 <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Queries Over Time</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.timeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.2)" />
                        <XAxis dataKey="date" tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: 'rgba(75, 85, 99, 1)', color: 'white', borderRadius: '0.5rem' }}/>
                        <Line type="monotone" dataKey="count" name="Queries" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                 </ResponsiveContainer>
             </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-dark p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.categoryDistribution}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.2)" />
                            <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: 'rgba(75, 85, 99, 1)', color: 'white', borderRadius: '0.5rem' }}/>
                            <Bar dataKey="count" fill="#4f46e5" name="Queries" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-dark p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Team Workload</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={analyticsData.teamWorkload}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {analyticsData.teamWorkload.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: 'rgba(75, 85, 99, 1)', color: 'white', borderRadius: '0.5rem' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;