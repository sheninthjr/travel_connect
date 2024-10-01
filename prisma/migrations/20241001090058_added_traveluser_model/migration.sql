-- CreateTable
CREATE TABLE "TravelUser" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,

    CONSTRAINT "TravelUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TravelUser" ADD CONSTRAINT "TravelUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelUser" ADD CONSTRAINT "TravelUser_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
