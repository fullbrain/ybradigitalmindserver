import { Module } from '@nestjs/common';
import { CategorysController } from './category.controller';
import { CategorysService } from './category.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class categoryModule {}
