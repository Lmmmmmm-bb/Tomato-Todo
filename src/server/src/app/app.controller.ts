import { Controller, Get } from '@nestjs/common';
import AppService from './app.service';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}
}

export default AppController;
