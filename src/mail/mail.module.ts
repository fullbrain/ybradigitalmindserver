import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: 'seifbaili73@gmail.com',
          pass: 'FN0Eg3PWIYyLXs9w',
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
