-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "sender_hotel_id" TEXT,
ALTER COLUMN "guide_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_sender_hotel_id_fkey" FOREIGN KEY ("sender_hotel_id") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
