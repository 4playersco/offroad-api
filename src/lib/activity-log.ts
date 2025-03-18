import cuid from "@bugsnag/cuid";

//   EVENT_ATTENDED                     TRANSACTIONAL
//   RUN_LED                            TRANSACTIONAL
//   EVENT_REVIEW_SUBMITTED             TODO
//   RUN_REPORT_SUBMITTED               TODO
//   GALLERY_PHOTO_SUBMITTED            TODO
//   GALLERY_PHOTOS_SUBMITTED           TODO
//   #COMMENTED                         TODO

export const newProfilePhoto = (username: string, userId: string) => ({
  id: cuid(),
  time: new Date(),
  message: `Added a new profile photo`,
  messageCode: "PROFILE_PHOTO_SUBMITTED",
  link: `/profile/${username}`,
  user: userId,
});

export const newRigbookPhoto = (username: string, userId: string) => ({
  id: cuid(),
  time: new Date(),
  message: `Added a new rigbook photo`,
  messageCode: "RIGBOOK_PHOTO_SUBMITTED",
  link: `/profile/${username}`,
  user: userId,
});

export const joined = (joined: string) => ({
  id: cuid(),
  time: new Date(joined).toISOString(),
  message: "Joined",
  messageCode: "JOINED",
});

export const runLed = (
  eventTitle: string,
  eventId: string,
  userId: string
) => ({
  id: cuid(),
  time: new Date(),
  message: `Led ${eventTitle}`,
  messageCode: "RUN_LED",
  link: `/event/${eventId}`,
  user: userId,
});
