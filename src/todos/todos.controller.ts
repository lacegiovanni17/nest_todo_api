import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/todos.dto';
import { Todo } from './todos.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get('single')
  findOne(@Query('id') id: string): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Delete()
  delete(@Query('id') id: string): Promise<Todo> {
    return this.todosService.delete(id);
  }

  @Put()
  update(
    @Query('id') id: string,
    @Body() updateTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }
}
