/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  {
    id: 1,
    username: 'marcos',
    password: 'marcos',
  },
  {
    id: 2,
    username: 'olavo',
    password: 'olavo',
  },
  {
    id: 1,
    username: 'silva',
    password: 'silva',
  },
  {
    id: 2,
    username: 'buganeme',
    password: 'buganeme',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
