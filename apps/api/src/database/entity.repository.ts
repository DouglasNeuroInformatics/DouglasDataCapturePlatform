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
    const entity = new this.entityModel(entityDoc);
    return entity.save();
  }

  async find(filterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[]> {
    return this.entityModel.find(filterQuery, projection).exec();
  }

  async findAll(): Promise<T[]> {
    return this.entityModel.find().exec();
  }

  async findById(id: string): Promise<T> {
    const entity = await this.entityModel.findById(id);
    if (!entity) {
      throw new RepositoryOperationError(`Failed to find document with id: ${id}`);
    }
    return entity;
  }

  async updateById(id: string, updateQuery: UpdateQuery<unknown>): Promise<T> {
    const updatedEntity = await this.entityModel.findByIdAndUpdate(id, updateQuery, {
      new: true
    });
    if (!updatedEntity) {
      throw new RepositoryOperationError(`Failed to find document with id: ${id}`);
    }
    return updatedEntity;
  }

  async deleteById(id: string): Promise<void> {
    const deletedEntity = await this.entityModel.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new RepositoryOperationError(`Failed to find document with id: ${id}`);
    }
  }
}
