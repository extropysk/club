-- CreateEnum
CREATE TYPE "SportType" AS ENUM ('AlpineSki', 'BackcountrySki', 'Badminton', 'Canoeing', 'Crossfit', 'EBikeRide', 'Elliptical', 'EMountainBikeRide', 'Golf', 'GravelRide', 'Handcycle', 'HighIntensityIntervalTraining', 'Hike', 'IceSkate', 'InlineSkate', 'Kayaking', 'Kitesurf', 'MountainBikeRide', 'NordicSki', 'Pickleball', 'Pilates', 'Racquetball', 'Ride', 'RockClimbing', 'RollerSki', 'Rowing', 'Run', 'Sail', 'Skateboard', 'Snowboard', 'Snowshoe', 'Soccer', 'Squash', 'StairStepper', 'StandUpPaddling', 'Surfing', 'Swim', 'TableTennis', 'Tennis', 'TrailRun', 'Velomobile', 'VirtualRide', 'VirtualRow', 'VirtualRun', 'Walk', 'WeightTraining', 'Wheelchair', 'Windsurf', 'Workout', 'Yoga');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "external_id" TEXT,
    "upload_id" BIGINT,
    "athlete_id" BIGINT,
    "name" TEXT,
    "distance" DOUBLE PRECISION,
    "moving_time" INTEGER,
    "elapsed_time" INTEGER,
    "total_elevation_gain" DOUBLE PRECISION,
    "elev_high" DOUBLE PRECISION,
    "elev_low" DOUBLE PRECISION,
    "type" TEXT,
    "sport_type" "SportType",
    "start_date" TIMESTAMP(3),
    "start_date_local" TIMESTAMP(3),
    "timezone" TEXT,
    "start_latlng" DOUBLE PRECISION[],
    "end_latlng" DOUBLE PRECISION[],
    "achievement_count" INTEGER,
    "kudos_count" INTEGER,
    "comment_count" INTEGER,
    "athlete_count" INTEGER,
    "photo_count" INTEGER,
    "total_photo_count" INTEGER,
    "map_id" TEXT,
    "map_summary_polyline" TEXT,
    "trainer" BOOLEAN,
    "commute" BOOLEAN,
    "manual" BOOLEAN,
    "private" BOOLEAN,
    "flagged" BOOLEAN,
    "workout_type" INTEGER,
    "upload_id_str" TEXT,
    "average_speed" DOUBLE PRECISION,
    "max_speed" DOUBLE PRECISION,
    "has_kudoed" BOOLEAN,
    "hide_from_home" BOOLEAN,
    "gear_id" TEXT,
    "kilojoules" DOUBLE PRECISION,
    "average_watts" DOUBLE PRECISION,
    "device_watts" BOOLEAN,
    "max_watts" INTEGER,
    "weighted_average_watts" INTEGER,
    "user_id" TEXT NOT NULL,
    "utc_offset" INTEGER,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "visibility" TEXT,
    "has_heartrate" BOOLEAN,
    "heartrate_opt_out" BOOLEAN,
    "display_hide_heartrate_option" BOOLEAN,
    "from_accepted_tag" BOOLEAN,
    "pr_count" INTEGER,
    "average_cadence" DOUBLE PRECISION,
    "average_heartrate" DOUBLE PRECISION,
    "max_heartrate" DOUBLE PRECISION,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
