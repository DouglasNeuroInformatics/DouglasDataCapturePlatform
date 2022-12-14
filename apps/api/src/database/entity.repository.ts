import { NotFoundException } from '@nestjs/common';

import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export class RepositoryOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RepositoryOperationError';
  }
}

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(entityDoc: unknown): Promise<T> {
    return this.entityModel.create(entityDoc);
  }

  async find(filterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[]> {
    return this.entityModel.find(filterQuery, projection).exec();
  }

  async findOne(filterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T> {
    const entity = await this.entityModel.findOne(filterQuery, projection).exec();
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async findAll(): Promise<T[]> {
    return this.entityModel.find().exec();
  }

  async findById(id: string): Promise<T> {
    const entity = await this.entityModel.findById(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async updateById(id: string, updateQuery: UpdateQuery<unknown>): Promise<T> {
    const entity = await this.findById(id);
    return entity.update(updateQuery, {
      new: true
    });
  }

  async deleteById(id: string): Promise<void> {
    const entity = await this.findById(id);
    entity.delete();
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<void> {
    const entity = await this.findOne(filterQuery);
    entity.delete();
  }

  async exists(filterQuery: FilterQuery<T>): Promise<boolean> {
    return (await this.entityModel.exists(filterQuery).exec()) !== null;
  }
}
