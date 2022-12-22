import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from './requests';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//   @Post('/register')
//   public async register(
//     @Body() registerRequest: RegisterRequest,
//     @Res({ passthrough: true }) response: Response,
//     @Req() request: Request,
//   ) {
//     return this.authService.register(registerRequest, response, request);
//   }

  @Post('/login')
  public async login(
    @Body() loginRequest: LoginRequest,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.authService.login(loginRequest, response, request);
  }

  @Post('/refresh')
  public async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body('userAgent') userAgent: string,
  ) {
    return this.authService.refresh(request, response, userAgent);
  }
}
