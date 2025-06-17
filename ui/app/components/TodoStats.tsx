'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TodoStats {
  total: number;
  completed: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<string, any[]>;
  overdue: number;
}

interface TodoStatsProps {
  userId: number;
}

export default function TodoStats({ userId }: TodoStatsProps) {
  const [stats, setStats] = useState<TodoStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/todos/statistics?userId=${userId}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-lg p-4">Loading statistics...</div>;
  }

  if (!stats) {
    return null;
  }

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Completion Rate */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700">Completion Rate</h3>
        <div className="mt-2">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
              <div
                style={{ width: `${completionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-600">{completionRate}%</p>
          <p className="text-sm text-gray-500">{stats.completed} of {stats.total} tasks</p>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700">Priority Levels</h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-red-500">High</span>
            <span className="font-bold">{stats.byPriority.high}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-500">Medium</span>
            <span className="font-bold">{stats.byPriority.medium}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-500">Low</span>
            <span className="font-bold">{stats.byPriority.low}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
        <div className="mt-2 space-y-2">
          {Object.entries(stats.byCategory).map(([category, todos]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-600">{category}</span>
              <span className="font-bold">{todos.length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Tasks */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700">Overdue Tasks</h3>
        <div className="mt-2">
          <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
          <p className="text-sm text-gray-500">tasks past due date</p>
        </div>
      </div>
    </div>
  );
} 