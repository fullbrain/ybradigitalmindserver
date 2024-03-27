import { Module } from '@nestjs/common';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventModule {}
