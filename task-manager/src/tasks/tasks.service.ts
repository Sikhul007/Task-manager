import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const existing = await this.taskModel.findOne({
      title: createTaskDto.title,
    });
    if (existing) {
      throw new ConflictException('Task with this title already exists');
    }
    return this.taskModel.create(createTaskDto);
  }

  async findAll(
    status?: string,
    page: number = 1,
    limit: number = 10,
    sortBy: 'dueDate' | 'createdAt' = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<{ tasks: Task[]; total: number; pages: number }> {
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.taskModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .exec(),
      this.taskModel.countDocuments(filter).exec(),
    ]);

    const pages = Math.ceil(total / limit);

    return { tasks, total, pages };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Task not found');
  }
}
