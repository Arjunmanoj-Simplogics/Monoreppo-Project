'use client';

import { useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const categoryColors: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-800',
  Personal: 'bg-purple-100 text-purple-800',
  Shopping: 'bg-pink-100 text-pink-800',
  Health: 'bg-teal-100 text-teal-800',
  Education: 'bg-indigo-100 text-indigo-800',
  Entertainment: 'bg-orange-100 text-orange-800',
  Other: 'bg-gray-100 text-gray-800'
};

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
        completed: !todo.completed
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3001/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`bg-white rounded-lg shadow transition-all ${isExpanded ? 'p-6' : 'p-4'}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isLoading}
          className="mt-1 w-5 h-5"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>
          </div>

          {todo.dueDate && (
            <p className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              Due: {new Date(todo.dueDate).toLocaleString()}
            </p>
          )}

          {isExpanded && todo.notes && (
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{todo.notes}</p>
          )}

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-blue-500 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 