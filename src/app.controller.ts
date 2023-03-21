import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// NOTE: Database config.
dotenv.config();

const config: Config = {
  host: process.env.HOST_NAME,
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3306,
  ssl: {
    ca: fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem'),
  },
};

// NOTE: zod validation config.
const schema = z.object({
  id: z.string(),
  name: z.string(),
  adress: z.string(),
});

type Users = z.infer<typeof schema>;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(@Req() request: Request): string {
    const rawQuery = request.query;
    try {
      const validatedQuery: Users = schema.parse(rawQuery);
    } catch (error) {
      console.log(error);
    }

    return this.appService.getUsers();
  }

  @Get()
  postUsers(@Req() request: Request): string {
    const rawBody = request.body;
    try {
      const validatedBody: Users = schema.parse(rawBody);
    } catch (error) {
      console.log(error);
    }
    return this.appService.postUsers();
  }
}
