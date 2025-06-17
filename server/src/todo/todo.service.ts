import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  notes: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findByUserId(userId: number): Todo[] {
    return this.todos.filter(todo => todo.userId === userId);
  }

  create(data: {
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    notes?: string;
    userId: number;
  }): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: data.title,
      completed: false,
      category: data.category,
      priority: data.priority,
      dueDate: data.dueDate || null,
      notes: data.notes || '',
      userId: data.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, data: Partial<Todo>): Todo | null {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return todo;
    }
    return null;
  }

  delete(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this.todos.length !== initialLength;
  }

  getStatistics(userId: number) {
    const userTodos = this.findByUserId(userId);
    return {
      total: userTodos.length,
      completed: userTodos.filter(t => t.completed).length,
      byPriority: {
        high: userTodos.filter(t => t.priority === 'high').length,
        medium: userTodos.filter(t => t.priority === 'medium').length,
        low: userTodos.filter(t => t.priority === 'low').length,
      },
      byCategory: userTodos.reduce((acc, todo) => {
        acc[todo.category] = acc[todo.category] || [];
        acc[todo.category].push(todo);
        return acc;
      }, {} as Record<string, Todo[]>),
      overdue: userTodos.filter(t => 
        t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
      ).length,
    };
  }
} 