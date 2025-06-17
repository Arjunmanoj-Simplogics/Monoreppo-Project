import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, completed: boolean): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = completed;
    }
    return todo;
  }
} 