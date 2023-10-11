import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { BaseSchema } from '../schemas';

export class AbstractService<E extends BaseSchema> {
  protected repo: MongoRepository<E>;
  constructor(@InjectRepository(MongoRepository) repo: MongoRepository<E>) {
    this.repo = repo;
  }

  public async create(payload: any): Promise<E> {
    const resource = this.repo.create(payload);

    return this.repo.save(resource as unknown as DeepPartial<E>);
  }

  async update(id: string, payload: any): Promise<E> {
    this.validOrFailId(id);

    const updated = await this.repo.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: payload },
      { returnOriginal: false },
    );
    if (!updated.ok)
      throw new UnprocessableEntityException(null, 'Update operation failed');

    return updated.value as E;
  }

  async findOne(id: string): Promise<E> {
    return await this.repo.findOne(id);
  }

  async findById(id: string): Promise<E> {
    this.validOrFailId(id);

    const resource = await this.repo.findOne({
      _id: new ObjectID(id),
      isDeleted: false,
    } as Partial<E>);

    if (!resource) throw new NotFoundException(null, 'Ressource not found');
    return resource;
  }

  public async delete(id: string): Promise<E> {
    const resource = await this.findById(id);
    resource.isDeleted = true;

    const deleted = await this.repo.findOneAndUpdate(
      { _id: resource._id },
      { $set: { isDeleted: true, updatedAt: new Date().toISOString() } },
      { returnOriginal: false },
    );
    if (!deleted.ok)
      throw new UnprocessableEntityException(null, 'Deletion failed');
    return resource;
  }

  validOrFailId(id) {
    if (!isMongoId(id)) {
      throw new BadRequestException(null, 'You must provide valid id');
    }
  }
}
