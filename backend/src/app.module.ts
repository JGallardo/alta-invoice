import { Module } from '@nestjs/common';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [InvoiceModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {} 