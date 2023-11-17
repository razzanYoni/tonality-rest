## REST Service for Tonality
This REST API service is used for the communication of client with other services.

## Database Schema
| user     |
|----------|
| user_id  |
| username |
| password |

Types:\
"user_id" SERIAL NOT NULL\
"username" VARCHAR(50) NOT NULL\
"password" VARCHAR(255) NOT NULL\
PRIMARY KEY ("user_id")

| premium_album  |
|----------------|
| album_id       |
| album_name     |
| release_date   |
| genre          |
| artist         |
| cover_filename |

Types:\
"album_id" SERIAL NOT NULL\
"album_name" VARCHAR(255) NOT NULL\
"release_date" DATE NOT NULL\
"genre" VARCHAR(255) NOT NULL\
"artist" VARCHAR(255) NOT NULL\
"cover_filename" VARCHAR(255) NOT NULL\
PRIMARY KEY ("album_id")

| premium_song    |
|-----------------|
| song_id         |
| album_id        |
| title           |
| artist          |
| song_number     |
| disc_number     |
| duration        |
| audio_filename  |

Types:\
"song_id" SERIAL NOT NULL\
"album_id" INTEGER NOT NULL\
"title" VARCHAR(255) NOT NULL\
"artist" VARCHAR(255) NOT NULL\
"song_number" SMALLINT NOT NULL\
"disc_number" SMALLINT\
"duration" INTEGER NOT NULL\
"audio_filename" VARCHAR(255) NOT NULL\
PRIMARY KEY ("song_id")

## API Endpoints
See [the routers](./src/routers)

## Task Distribution
| Task                           | Student ID |
|--------------------------------|------------|
| Authentication & Authorization | 13521096   |
| Albums & Songs                 | 13521063   |
| Subscriptions                  | 13521087   |
| Environment & Build            | 13521096   |