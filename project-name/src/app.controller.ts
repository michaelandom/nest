import { Controller, Get, Header, Param } from '@nestjs/common';
import { AppService } from './app.service';

//localhost:3000/
//@Controller("/project")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Header('Content-type', 'text/html')
  getHello(): { name: string } {
    return this.appService.getHello();
  }

  // @Get('/:id')
  // getSingle(@Param('id') id: string): { name: string; id: string } {
  //   return { id: id, name: 'test' };
  // }
}
