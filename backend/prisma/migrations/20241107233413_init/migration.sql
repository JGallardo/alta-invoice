-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "vendor_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
