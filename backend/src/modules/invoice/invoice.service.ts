import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [invoices, total] = await Promise.all([
      this.prisma.invoice.findMany({
        skip,
        take: limit,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.invoice.count(),
    ]);

    return {
      data: invoices,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: Number(id) }
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async getTotal() {
    const invoices = await this.prisma.invoice.findMany({
      select: {
        amount: true,
        due_date: true
      }
    });

    const totals = invoices.reduce((acc, invoice) => {
      const dueDate = invoice.due_date;
      const amount = invoice.amount || 0;

      if (!acc[dueDate]) {
        acc[dueDate] = amount;
      } else {
        acc[dueDate] += amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(totals).map(([due_date, total]) => ({
      due_date,
      total
    }));
  }
} 