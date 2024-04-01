import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create.token.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createToken(@Req() req: Request, @Body() body: CreateTokenDto) {
    const userEmail = req['user'].email;
    return await this.tokenService.createToken(userEmail, body.token);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteToken(@Req() req: Request) {
    const userEmail = req['user'].email;
    return await this.tokenService.deleteToken(userEmail);
  }
}
