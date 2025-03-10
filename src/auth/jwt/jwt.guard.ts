import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  WHITE_LIST = ['/uploads/sign'];
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    //경로가 화이트리스트에 있으면 인증을 건너뛴다.
    if (this.WHITE_LIST.includes(request.url)) {
      return true;
    }

    return super.canActivate(context);
  }
}
