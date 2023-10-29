-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "premium_album" (
    "album_id" SERIAL NOT NULL,
    "album_name" VARCHAR(255) NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "cover_filename" VARCHAR(255) NOT NULL,

    CONSTRAINT "premium_album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "premium_song" (
    "song_id" SERIAL NOT NULL,
    "album_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "song_number" INTEGER NOT NULL,
    "disc_number" INTEGER,
    "duration" INTEGER NOT NULL,
    "audio_filename" VARCHAR(255) NOT NULL,

    CONSTRAINT "premium_song_pkey" PRIMARY KEY ("song_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "premium_song" ADD CONSTRAINT "premium_song_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "premium_album"("album_id") ON DELETE CASCADE ON UPDATE CASCADE;
