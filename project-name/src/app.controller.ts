import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserCreate } from './dto/create-user.dto';
import { UsersResponse } from './entites/uses.entites';

//localhost:3000/
//@Controller("/project")
@ApiTags('users')
@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiOkResponse({ type: UsersResponse, isArray: true })
  // @Header('Content-type', 'text/html')\
  getHello(@Query('name') name?: string): UsersResponse[] {
    return this.appService.getHello(name);
  }
  @ApiCreatedResponse({ type: UsersResponse })
  @Post()
  createUser(@Body() body: UserCreate): UsersResponse {
    return this.appService.createUser(body.name);
  }
  @Get('/:id')
  @ApiOkResponse({ type: UsersResponse })
  getSingle(@Param('id') id: string): UsersResponse {
    return this.appService.getSingle(id);
  }
}
