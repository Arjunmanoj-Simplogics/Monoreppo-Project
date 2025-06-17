import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todoService.update(+id, completed);
  }
} 