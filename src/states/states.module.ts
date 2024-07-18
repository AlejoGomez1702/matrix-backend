import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [ TypeOrmModule.forFeature([State]) ],
  exports: [TypeOrmModule]
})
export class StatesModule {}
