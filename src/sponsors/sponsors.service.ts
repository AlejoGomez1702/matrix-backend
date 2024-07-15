import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { Repository } from 'typeorm';
import { handleDBErrors } from 'src/common/helpers/db-error-handler.helper';

@Injectable()
export class SponsorsService {

  private logger: Logger = new Logger('SponsorsService');

  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>
  ) {}

  
  async create(createSponsorDto: CreateSponsorDto) {

    const { name } = createSponsorDto;

    try {
      const sponsor = this.sponsorRepository.create({ name });
      await this.sponsorRepository.save(sponsor);
      // return sponsor;
    } catch (error) {
      return handleDBErrors(error, this.logger);
    }

  }

  async findAll() {
    const [ results, total ] = await this.sponsorRepository.findAndCount({});

    return {
      data: results,
      total
    };
  }

  findOne(id: string) {
    // const sponsor = this.sponsorRepository.findOne({
    //   where: { id }
    // });

    // if(!sponsor)
    //   throw new NotFoundException(`Sponsor with id ${id} not found`);

    // return sponsor;
  }

  async update(id: string, updateSponsorDto: UpdateSponsorDto) {

    // const sponsor = await this.sponsorRepository.preload({
    //   id,
    //   ...updateSponsorDto
    // });

    // if(!sponsor)
    //   throw new NotFoundException(`Sponsor with id ${id} not found`);

    // try {
    //   await this.sponsorRepository.save(sponsor);
    //   return sponsor;
    // } catch (error) {
    //   return handleDBErrors(error, this.logger);
    // }
  }

  async remove(id: string) {
    // const deleteResponse = await this.sponsorRepository.softDelete(id);
    // if( !deleteResponse.affected )
    //   throw new NotFoundException(`Sponsor with id ${id} not found`);
  }
}
