import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  login() {
    return 'login';
  }

  validateUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
