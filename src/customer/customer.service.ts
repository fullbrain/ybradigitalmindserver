import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Injectable({})
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const create = await this.prisma.customer.create({
        data: {
          organisation: createCustomerDto.organisation,
          country: createCustomerDto.country,
          city: createCustomerDto.city,
          industry_sector: createCustomerDto.industry_sector,
          logo: createCustomerDto.logo,
        },
      });
      return create;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException(
            'Un client avec les mêmes informations existe déjà.',
          );
        }
      } else if (err instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'Vérifiez la structure et le format des données.',
        );
      } else {
        console.log('ERROR: ', err);
      }
    }
  }

  async findAllCustomer(limit: number) {
    try {
      return this.prisma.customer.findMany({
        take: limit,
      });
    } catch (err) {
      throw new Error(
        'Une erreur est survenue lors de la récupération des clients.',
      );
    }
  }

  async deleteCustomer(id: number) {
    try {
      return this.prisma.customer.delete({
        where: { id },
      });
    } catch (err) {
      if (
        err.message.includes(
          'An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
        )
      ) {
        console.log('ERROR WHILE ');
      }
    }
  }

  async updateCustomer(
    id: number,
    updateCustomerDto: Partial<CreateCustomerDto>,
  ) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async findByIdCustomer(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async countProjectByCustomer(organisation: string) {
    return this.prisma.customer.count({
      where: { organisation: organisation },
    });
  }
}
