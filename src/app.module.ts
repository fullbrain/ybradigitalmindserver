import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { CustomerModule } from './customer/customer.module';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './projects/project.module';
import { categoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostModule,
    AuthModule,
    UserModule,
    EventModule,
    ProjectModule,
    CategoriesModule,
    TeamModule,
    CustomerModule,
    JobModule,
    categoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
