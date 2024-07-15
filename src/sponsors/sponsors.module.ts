import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';

@Module({
  controllers: [SponsorsController],
  providers: [SponsorsService],
  imports: [ TypeOrmModule.forFeature([Sponsor]) ],
  exports: [TypeOrmModule]
})
export class SponsorsModule {}
