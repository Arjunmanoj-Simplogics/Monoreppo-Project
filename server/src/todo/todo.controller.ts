import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    if (!userId) {
      throw new HttpException('UserId is required', HttpStatus.BAD_REQUEST);
    }
    return this.todoService.findByUserId(+userId);
  }

  @Get('statistics')
  getStatistics(@Query('userId') userId: string) {
    if (!userId) {
      throw new HttpException('UserId is required', HttpStatus.BAD_REQUEST);
    }
    return this.todoService.getStatistics(+userId);
  }

  @Post()
  create(@Body() createTodoDto: {
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    notes?: string;
    userId: number;
  }) {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<{
    title: string;
    completed: boolean;
    category: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    notes: string;
  }>) {
    const todo = this.todoService.update(+id, updateData);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const isDeleted = this.todoService.delete(+id);
    if (!isDeleted) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Todo deleted successfully' };
  }
} 