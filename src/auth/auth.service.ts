import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';
import { UserPayload } from 'src/auth/models/UserPayload';
import { UserToken } from 'src/auth/models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // transforma o user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };

    // throw new Error('Method not implemented.');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      // verificar a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    // se chegar aqui, indica que não encontrou user e/ou a senha não corresponde
    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
