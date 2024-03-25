import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create.token.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createToken(@Body() body: CreateTokenDto) {
    return await this.tokenService.createToken(body.email, body.token);
  }
}
