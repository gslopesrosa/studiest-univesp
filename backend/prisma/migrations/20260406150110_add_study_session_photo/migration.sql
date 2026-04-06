-- CreateTable
CREATE TABLE "StudySessionPhoto" (
    "id" TEXT NOT NULL,
    "studySessionId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudySessionPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudySessionPhoto_studySessionId_idx" ON "StudySessionPhoto"("studySessionId");

-- AddForeignKey
ALTER TABLE "StudySessionPhoto" ADD CONSTRAINT "StudySessionPhoto_studySessionId_fkey" FOREIGN KEY ("studySessionId") REFERENCES "StudySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
