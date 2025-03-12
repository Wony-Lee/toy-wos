import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() body: LoginAuthDto): Promise<ResponseAuthDto> {
    return this.authService.signIn(body);
  }

  @Post('signout')
  signOut(@Body() body: LoginAuthDto): Promise<ResponseAuthDto> {
    return this.authService.signOut(body);
  }

  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.authService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
