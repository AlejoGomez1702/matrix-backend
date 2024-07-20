import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {

  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  create(createStateDto: CreateStateDto) {
    return 'This action adds a new state';
  }

  async findAll() {

    const [results, total] = await this.statesRepository.findAndCount({});

    return { results, total };

  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
