import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/todos.dto';
import { Todo, TodoDocument } from './todos.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async create(payload: CreateTodoDto): Promise<Todo> {
    const created = new this.todoModel({
      ...payload,
      is_completed: payload.is_completed ?? false,
    });
    return created.save();
  }

  async delete(id: string): Promise<Todo> {
    const deleted = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Todo not found');
    return deleted;
  }

  async update(id: string, payload: CreateTodoDto): Promise<Todo> {
    const updated = await this.todoModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Todo not found');
    return updated;
  }
}
