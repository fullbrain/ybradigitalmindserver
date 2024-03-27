import {
  BadRequestException,
  Body,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto, SignUpDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signin(@Body() dto: AuthDto) {
    try {
      const user = await this.validateUser(dto.email);

      if (!user) {
        throw new ForbiddenException("L'utilisateur n'existe pas");
      }

      const pwMatch = await argon.verify(user.hash, dto.password);

      if (!pwMatch) {
        throw new ForbiddenException('Mot de passe incorrect');
      }

      return this.createAccessToken(user);
    } catch (err) {
      console.log('ERROR IN THE AUTH SERVICE: ', err);
      if (err instanceof ForbiddenException) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  async signup(@Body() dto: SignUpDto) {
    try {
      const userExists = await this.validateUser(dto.email);

      if (userExists) {
        throw new ForbiddenException(
          'Un utilisateur avec les mêmes informations existe déjà.',
        );
      }

      if (dto.password !== dto.confirmpassword) {
        throw new BadRequestException(
          'Les mots de passe que vous avez saisis ne correspondent pas.',
        );
      }

      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          firstname: dto.firstname,
          lastname: dto.lastname,
        },
      });

      return user;
    } catch (err) {
      console.log('ERROR IN THE AUTH SERVICE: ', err);
      if (
        err instanceof ForbiddenException ||
        err instanceof BadRequestException
      ) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  refresh(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async createAccessToken(user: User): Promise<{
    email: string;
    id: number;
    name: string;
    role: string;
    access_token: string;
  }> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      email: user.email,
      id: user.id,
      role: user.role,
      name: `${user.firstname} ${user.lastname}`,
      access_token: token,
    };
  }

  async createRefreshToken(user: User) {
    const tokenId = uuid();
    const payload = { email: user.email, sub: user.id, tokenId: tokenId };

    return this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async validateUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
