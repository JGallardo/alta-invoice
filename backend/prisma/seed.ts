import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mockInvoices = [
  {
    date: '09/11/23',
    vendor_name: 'Smart and Final',
    description: 'Rental',
    due_date: '10/31/2023',
    amount: 450.00,
    paid: true
  },
  {
    date: '09/12/23',
    vendor_name: 'Ralphs',
    description: 'Rental',
    due_date: '10/29/2023',
    amount: 228.75,
    paid: false
  },
  {
    date: '09/13/23',
    vendor_name: 'Vons',
    description: 'Rental',
    due_date: '10/28/2023',
    amount: 375.50,
    paid: true
  },
  {
    date: '09/14/23',
    vendor_name: 'Food 4 Less',
    description: 'Rental',
    due_date: '10/27/2023',
    amount: 290.25,
    paid: false
  },
  {
    date: '09/15/23',
    vendor_name: 'Albertsons',
    description: 'Rental',
    due_date: '10/26/2023',
    amount: 445.00,
    paid: true
  },
  {
    date: '09/16/23',
    vendor_name: 'Stater Bros',
    description: 'Rental',
    due_date: '10/25/2023',
    amount: 315.75,
    paid: false
  },
  {
    date: '09/17/23',
    vendor_name: 'Gelson\'s',
    description: 'Rental',
    due_date: '10/24/2023',
    amount: 525.50,
    paid: true
  },
  {
    date: '09/18/23',
    vendor_name: 'Trader Joe\'s',
    description: 'Rental',
    due_date: '10/23/2023',
    amount: 275.25,
    paid: false
  },
  {
    date: '09/19/23',
    vendor_name: 'Whole Foods',
    description: 'Rental',
    due_date: '10/22/2023',
    amount: 490.00,
    paid: true
  },
  {
    date: '09/20/23',
    vendor_name: 'Sprouts',
    description: 'Rental',
    due_date: '10/21/2023',
    amount: 335.75,
    paid: false
  },
  {
    date: '09/21/23',
    vendor_name: 'Bristol Farms',
    description: 'Rental',
    due_date: '10/20/2023',
    amount: 415.50,
    paid: true
  },
  {
    date: '09/22/23',
    vendor_name: 'Costco',
    description: 'Rental',
    due_date: '10/19/2023',
    amount: 567.00,
    paid: true
  },
  {
    date: '09/23/23',
    vendor_name: 'Office Depot',
    description: 'Rental',
    due_date: '10/18/2023',
    amount: 289.99,
    paid: false
  },
  {
    date: '09/24/23',
    vendor_name: 'Amazon',
    description: 'Rental',
    due_date: '10/17/2023',
    amount: 445.50,
    paid: true
  },
  {
    date: '09/25/23',
    vendor_name: 'Ikea',
    description: 'Rental',
    due_date: '10/16/2023',
    amount: 334.25,
    paid: false
  },
  {
    date: '09/26/23',
    vendor_name: 'Sysco',
    description: 'Rental',
    due_date: '10/15/2023',
    amount: 478.00,
    paid: true
  },
  {
    date: '09/27/23',
    vendor_name: 'Fiber Optics',
    description: 'Rental',
    due_date: '10/14/2023',
    amount: 267.75,
    paid: false
  },
  {
    date: '09/28/23',
    vendor_name: 'US Foods',
    description: 'Rental',
    due_date: '10/13/2023',
    amount: 589.99,
    paid: true
  },
  {
    date: '09/29/23',
    vendor_name: 'Costco',
    description: 'Rental',
    due_date: '10/12/2023',
    amount: 345.50,
    paid: false
  },
  {
    date: '09/30/23',
    vendor_name: 'Office Depot',
    description: 'Rental',
    due_date: '10/11/2023',
    amount: 432.25,
    paid: true
  },
  {
    date: '10/01/23',
    vendor_name: 'Amazon',
    description: 'Rental',
    due_date: '10/10/2023',
    amount: 256.75,
    paid: false
  },
  {
    date: '10/02/23',
    vendor_name: 'Ikea',
    description: 'Rental',
    due_date: '10/09/2023',
    amount: 498.00,
    paid: true
  },
  {
    date: '10/03/23',
    vendor_name: 'Sysco',
    description: 'Rental',
    due_date: '10/08/2023',
    amount: 312.50,
    paid: false
  },
  {
    date: '10/04/23',
    vendor_name: 'US Foods',
    description: 'Rental',
    due_date: '10/07/2023',
    amount: 423.75,
    paid: true
  },
  {
    date: '10/05/23',
    vendor_name: 'Costco',
    description: 'Rental',
    due_date: '10/06/2023',
    amount: 567.00,
    paid: false
  },
  {
    date: '10/06/23',
    vendor_name: 'Office Depot',
    description: 'Rental',
    due_date: '10/05/2023',
    amount: 289.99,
    paid: true
  },
  {
    date: '10/07/23',
    vendor_name: 'Amazon',
    description: 'Rental',
    due_date: '10/04/2023',
    amount: 445.50,
    paid: false
  },
  {
    date: '10/08/23',
    vendor_name: 'Ikea',
    description: 'Rental',
    due_date: '10/03/2023',
    amount: 334.25,
    paid: true
  },
  {
    date: '10/09/23',
    vendor_name: 'Sysco',
    description: 'Rental',
    due_date: '10/02/2023',
    amount: 478.00,
    paid: false
  },
  {
    date: '10/10/23',
    vendor_name: 'Fiber Optics',
    description: 'Rental',
    due_date: '10/01/2023',
    amount: 267.75,
    paid: true
  },
  {
    date: '10/11/23',
    vendor_name: 'US Foods',
    description: 'Rental',
    due_date: '09/30/2023',
    amount: 589.99,
    paid: false
  },
  {
    date: '10/12/23',
    vendor_name: 'Costco',
    description: 'Rental',
    due_date: '09/29/2023',
    amount: 345.50,
    paid: true
  },
  {
    date: '10/13/23',
    vendor_name: 'Office Depot',
    description: 'Rental',
    due_date: '09/28/2023',
    amount: 432.25,
    paid: false
  }
]

async function main() {
  // Create user with nested invoices
  await prisma.user.create({
    data: {
      email: 'demo@altametrics.com',
      password: '1234',
      name: 'Demo User',
      invoices: {
        create: mockInvoices
      }
    }
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 