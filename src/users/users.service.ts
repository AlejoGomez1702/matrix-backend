import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { QueryGetTotalDto } from './dto/query-get-total.dto';
import { ChangeStateDto } from './dto/change-state.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    
    const [results, total] = await this.usersRepository.createQueryBuilder("user")
                                        .leftJoinAndSelect("user.state", "state") // Asegúrate de que "state" es el nombre correcto de la propiedad en tu entidad User que se relaciona con State
                                        .where("user.isActive = :isActive", { isActive: true })
                                        .andWhere("user.roles @> :roles", { roles: ['user'] }) // '@>' es el operador de contención de array en PostgreSQL
                                        .getManyAndCount();

    return { results, total };
  }

  async findAllRegisters(queryGetTotalDto: QueryGetTotalDto) {
    const total = await this.usersRepository
                        .createQueryBuilder("user")
                        .innerJoinAndSelect("user.state", "state") // Realiza un join con la tabla de estados
                        .where("user.isActive = :isActive", { isActive: true })
                        .andWhere("user.roles @> :roles", { roles: ['user'] })
                        .andWhere("state.name = :stateName", { stateName: queryGetTotalDto.state }) // Filtra por el nombre del estado
                        .getCount();
  
    return total;
  }

  async changeState(id: number, changeStateDto: ChangeStateDto) {
    // Buscar el usuario por su ID
    const user = await this.usersRepository.findOne({
      where: { id: (id+"") },
      relations: ['state']
    });

    // Verificar si el usuario existe
    if (!user) 
      throw new NotFoundException(`User with ID ${id} not found`);

    user.state = changeStateDto.stateId;
    await this.usersRepository.save(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
