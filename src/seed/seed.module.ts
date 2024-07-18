import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { StatesModule } from 'src/states/states.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ AuthModule, StatesModule ],
})
export class SeedModule {}
