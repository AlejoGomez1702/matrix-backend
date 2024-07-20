import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { State } from 'src/states/entities/state.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository( State )
    private readonly stateRepository: Repository<State>,
    @InjectRepository( User ) 
    private readonly userRepository: Repository<User>,
  ) {}
  
  async runSeeds() {

    await this.deleteTables();
    const states = await this.insertStates();
    // const registerId = +states.find( state => state.name === 'Registrado' ).id;

    // await this.insertUsers( registerId );

    // return {
    //   message: 'Seeds executed successfully!'
    // };
  }

  private async insertStates() {

    const seedStates = initialData.states;

    const states: State[] = [];

    seedStates.forEach( seedState => {
      states.push( this.stateRepository.create( seedState ) );
    })

    return await this.stateRepository.save( states );
  }

  private async insertUsers( registerId: number ) {

    // const seedUsers = initialData.users;

    // const users: User[] = [];

    // seedUsers.forEach( seedUser => {

    //   seedUser.state = registerId;
    //   users.push( this.userRepository.create( seedUser ) );
    // })

    // await this.userRepository.save( users );
  }

  private async deleteTables() {

    const queryBuilderStates = this.stateRepository.createQueryBuilder();
    await queryBuilderStates.delete()
                            .where({})
                            .execute();

    const queryBuilderUsers = this.userRepository.createQueryBuilder();
    await queryBuilderUsers.delete()
                      .where({})
                      .execute();
  }
}
