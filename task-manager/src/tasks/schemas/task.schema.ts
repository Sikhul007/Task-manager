import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] })
  status: 'Pending' | 'In Progress' | 'Completed';

  @Prop({
    required: true,
    validate: {
      validator: (value: Date) => value > new Date(),
      message: 'dueDate must be a future date',
    },
  })
  dueDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
