import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AkkordarAuthGuard extends AuthGuard('jwt') {

}