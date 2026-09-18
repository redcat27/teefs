-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
