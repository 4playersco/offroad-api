/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A valid date time value */
  DateTime: { input: any; output: any; }
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deceased = 'DECEASED',
  Delinquent = 'DELINQUENT',
  Inactive = 'INACTIVE',
  Limited = 'LIMITED',
  Locked = 'LOCKED',
  PastDue = 'PAST_DUE',
  Rejected = 'REJECTED',
  Removed = 'REMOVED',
  Resigned = 'RESIGNED'
}

export enum AccountType {
  Associate = 'ASSOCIATE',
  Emeritus = 'EMERITUS',
  Full = 'FULL',
  Guest = 'GUEST'
}

export type ActivityLogItem = {
  __typename?: 'ActivityLogItem';
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageCode: ActivityMessageCode;
  time: Scalars['DateTime']['output'];
  user: User;
};

export enum ActivityMessageCode {
  EventAttended = 'EVENT_ATTENDED',
  EventReviewSubmitted = 'EVENT_REVIEW_SUBMITTED',
  GalleryPhotosSubmitted = 'GALLERY_PHOTOS_SUBMITTED',
  GalleryPhotoSubmitted = 'GALLERY_PHOTO_SUBMITTED',
  Joined = 'JOINED',
  ProfilePhotoSubmitted = 'PROFILE_PHOTO_SUBMITTED',
  RigbookPhotoSubmitted = 'RIGBOOK_PHOTO_SUBMITTED',
  RunLed = 'RUN_LED',
  RunReportSubmitted = 'RUN_REPORT_SUBMITTED'
}

export type AdminStats = {
  __typename?: 'AdminStats';
  activeFullMembers?: Maybe<Scalars['Int']['output']>;
  associateMembers?: Maybe<Scalars['Int']['output']>;
  charterMembers?: Maybe<Scalars['Int']['output']>;
  deceasedMembers?: Maybe<Scalars['Int']['output']>;
  delinquentFullMembers?: Maybe<Scalars['Int']['output']>;
  emeritusMembers?: Maybe<Scalars['Int']['output']>;
  fullMembersAllowed?: Maybe<Scalars['Int']['output']>;
  fullMembersLastYear?: Maybe<Scalars['Int']['output']>;
  guestMembers?: Maybe<Scalars['Int']['output']>;
  inactiveFullMembers?: Maybe<Scalars['Int']['output']>;
  limitedGuestMembers?: Maybe<Scalars['Int']['output']>;
  lockedGuestMembers?: Maybe<Scalars['Int']['output']>;
  neededForQuorum?: Maybe<Scalars['Int']['output']>;
  neededToPassMotion?: Maybe<Scalars['Int']['output']>;
  neededToVoteOnNewMember?: Maybe<Scalars['Int']['output']>;
  newFullMembersAllowed?: Maybe<Scalars['Int']['output']>;
  newFullMembersThisYear?: Maybe<Scalars['Int']['output']>;
  pastDueFullMembers?: Maybe<Scalars['Int']['output']>;
  removedFullMembers?: Maybe<Scalars['Int']['output']>;
  resignedFullMembers?: Maybe<Scalars['Int']['output']>;
};

export type Ballot = {
  __typename?: 'Ballot';
  candidates: Array<User>;
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  results?: Maybe<Array<Maybe<Result>>>;
  title: Scalars['String']['output'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type BallotInput = {
  candidates: Array<UserInput>;
  desc?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Bandaid = {
  __typename?: 'Bandaid';
  description?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Event>;
  id: Scalars['ID']['output'];
  memberInvolved?: Maybe<User>;
  occurred?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CloudinaryImage = {
  __typename?: 'CloudinaryImage';
  id?: Maybe<Scalars['ID']['output']>;
  publicId: Scalars['String']['output'];
  smallUrl?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type CloudinaryImageInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  publicId: Scalars['String']['input'];
  smallUrl?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Condition = {
  __typename?: 'Condition';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  report: RunReport;
  status: TrailCondition;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type Docs = {
  __typename?: 'Docs';
  archives: Array<Maybe<YearlyArchive>>;
  bylaws: Document;
  sors: Document;
};

export type Document = {
  __typename?: 'Document';
  date: Scalars['DateTime']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type DuesPaymentInput = {
  token: Scalars['String']['input'];
};

export type Election = {
  __typename?: 'Election';
  createdAt: Scalars['DateTime']['output'];
  electionName: Scalars['String']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  races?: Maybe<Array<Maybe<Ballot>>>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ElectionInput = {
  electionName: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  races: Array<BallotInput>;
  startTime: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']['output']>;
  bandaids?: Maybe<Array<Maybe<Bandaid>>>;
  changeDisabled?: Maybe<Scalars['Boolean']['output']>;
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  featuredImage?: Maybe<CloudinaryImage>;
  host?: Maybe<User>;
  id: Scalars['ID']['output'];
  maxAttendees?: Maybe<Scalars['Int']['output']>;
  maxRigs?: Maybe<Scalars['Int']['output']>;
  membersOnly?: Maybe<Scalars['Boolean']['output']>;
  rallyAddress?: Maybe<Scalars['String']['output']>;
  rsvps?: Maybe<Array<Maybe<Rsvp>>>;
  runReports?: Maybe<Array<Maybe<RunReport>>>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  trail?: Maybe<Trail>;
  trailDifficulty?: Maybe<TrailDifficulty>;
  trailNotes?: Maybe<Scalars['String']['output']>;
  type: EventType;
};

export type EventCount = {
  __typename?: 'EventCount';
  count?: Maybe<Scalars['Int']['output']>;
};

export enum EventType {
  Camping = 'CAMPING',
  Clinic = 'CLINIC',
  Collection = 'COLLECTION',
  Fundraising = 'FUNDRAISING',
  Meeting = 'MEETING',
  Run = 'RUN',
  Social = 'SOCIAL'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Undisclosed = 'UNDISCLOSED'
}

export type ImageUpdateInput = {
  new: CloudinaryImageInput;
  old?: InputMaybe<CloudinaryImageInput>;
};

export type MemberCount = {
  __typename?: 'MemberCount';
  count?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type MembershipLogItem = {
  __typename?: 'MembershipLogItem';
  id: Scalars['ID']['output'];
  logger?: Maybe<User>;
  message: Scalars['String']['output'];
  messageCode: MembershipMessageCode;
  time: Scalars['DateTime']['output'];
  user: User;
};

export enum MembershipMessageCode {
  AccountChanged = 'ACCOUNT_CHANGED',
  AccountCreated = 'ACCOUNT_CREATED',
  AccountRejected = 'ACCOUNT_REJECTED',
  AccountUnlocked = 'ACCOUNT_UNLOCKED',
  DuesPaid = 'DUES_PAID',
  GuestRestricted = 'GUEST_RESTRICTED',
  MembershipEligible = 'MEMBERSHIP_ELIGIBLE',
  MembershipGranted = 'MEMBERSHIP_GRANTED',
  OfficeAdded = 'OFFICE_ADDED',
  OfficeRemoved = 'OFFICE_REMOVED',
  TitleAdded = 'TITLE_ADDED',
  TitleRemoved = 'TITLE_REMOVED'
}

export enum MigrationStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Needed = 'NEEDED'
}

export type MonthlyArchive = {
  __typename?: 'MonthlyArchive';
  meetingMinutes?: Maybe<Document>;
  month: Scalars['String']['output'];
  newsletter?: Maybe<Document>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail?: Maybe<SuccessMessage>;
  changePassword?: Maybe<SuccessMessage>;
  createEvent?: Maybe<SuccessMessage>;
  createTrail?: Maybe<SuccessMessage>;
  deleteAvatar?: Maybe<SuccessMessage>;
  deleteEvent?: Maybe<SuccessMessage>;
  deleteRig?: Maybe<SuccessMessage>;
  editNewsletterPreferences?: Maybe<SuccessMessage>;
  logActivityEvent?: Maybe<SuccessMessage>;
  logMembershipEvent?: Maybe<SuccessMessage>;
  login: SuccessMessage;
  logout?: Maybe<SuccessMessage>;
  notifications?: Maybe<SuccessMessage>;
  payMembershipDues?: Maybe<SuccessMessage>;
  register?: Maybe<SuccessMessage>;
  rejectNewAccount: SuccessMessage;
  requestReset?: Maybe<SuccessMessage>;
  resetPassword: User;
  sendMessage?: Maybe<SuccessMessage>;
  setRSVP?: Maybe<SuccessMessage>;
  signUp: SuccessMessage;
  submitElection?: Maybe<Election>;
  submitVote?: Maybe<SuccessMessage>;
  unlockNewAccount: SuccessMessage;
  updateAccountStatus?: Maybe<User>;
  updateAccountType?: Maybe<User>;
  updateAvatar?: Maybe<SuccessMessage>;
  updateEvent?: Maybe<SuccessMessage>;
  updateOffice?: Maybe<User>;
  updateRig?: Maybe<SuccessMessage>;
  updateRole?: Maybe<User>;
  updateTitles?: Maybe<User>;
  updateTrail?: Maybe<SuccessMessage>;
  updateTrailImage?: Maybe<SuccessMessage>;
  updateUserAdminProfileSettings?: Maybe<SuccessMessage>;
  updateUserProfileSettings?: Maybe<SuccessMessage>;
  updateVehicle?: Maybe<SuccessMessage>;
};


export type MutationChangeEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  event: UpsertEventInput;
};


export type MutationCreateTrailArgs = {
  trail?: InputMaybe<TrailInput>;
};


export type MutationDeleteAvatarArgs = {
  avatar: CloudinaryImageInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRigArgs = {
  rig: CloudinaryImageInput;
};


export type MutationEditNewsletterPreferencesArgs = {
  action: NewsletterAction;
  list: NewsletterList;
};


export type MutationLogActivityEventArgs = {
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  messageCode: Scalars['String']['input'];
  time: Scalars['DateTime']['input'];
  username: Scalars['String']['input'];
};


export type MutationLogMembershipEventArgs = {
  code: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  message: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNotificationsArgs = {
  settings?: InputMaybe<NotificationsSettingsInput>;
};


export type MutationPayMembershipDuesArgs = {
  data: DuesPaymentInput;
};


export type MutationRegisterArgs = {
  confirmEmail: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
};


export type MutationRejectNewAccountArgs = {
  reason: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRequestResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  htmlText: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  to: Array<Scalars['String']['input']>;
};


export type MutationSetRsvpArgs = {
  rsvp?: InputMaybe<RsvpInput>;
};


export type MutationSignUpArgs = {
  birthdate: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Gender;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSubmitElectionArgs = {
  election: ElectionInput;
};


export type MutationSubmitVoteArgs = {
  vote?: InputMaybe<VoteInput>;
};


export type MutationUnlockNewAccountArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationUpdateAccountStatusArgs = {
  accountStatus?: InputMaybe<AccountStatus>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateAccountTypeArgs = {
  accountType?: InputMaybe<AccountType>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateAvatarArgs = {
  data: ImageUpdateInput;
};


export type MutationUpdateEventArgs = {
  event: UpsertEventInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOfficeArgs = {
  office?: InputMaybe<Office>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateRigArgs = {
  data: ImageUpdateInput;
};


export type MutationUpdateRoleArgs = {
  role?: InputMaybe<Role>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateTitlesArgs = {
  titles?: InputMaybe<Array<InputMaybe<Title>>>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateTrailArgs = {
  id: Scalars['ID']['input'];
  trail: TrailInput;
};


export type MutationUpdateTrailImageArgs = {
  id: Scalars['String']['input'];
  image: CloudinaryImageInput;
};


export type MutationUpdateUserAdminProfileSettingsArgs = {
  data: UserAdminUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserProfileSettingsArgs = {
  data: UserUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVehicleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  vehicle: VehicleInput;
};

export enum NewsletterAction {
  Subscribe = 'SUBSCRIBE',
  Unsubscribe = 'UNSUBSCRIBE'
}

export enum NewsletterList {
  General = 'GENERAL',
  Members = 'MEMBERS'
}

export type NewsletterPreference = {
  __typename?: 'NewsletterPreference';
  status?: Maybe<NewsletterAction>;
};

export type NotificationsSettingsInput = {
  emailMemberNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  emailPublicNotifications?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum Office {
  President = 'PRESIDENT',
  Secretary = 'SECRETARY',
  Treasurer = 'TREASURER',
  VicePresident = 'VICE_PRESIDENT'
}

export enum OutfitLevel {
  Modified = 'MODIFIED',
  Stock = 'STOCK'
}

export enum Poll {
  Election = 'ELECTION',
  RunSelection = 'RUN_SELECTION'
}

export type Preference = {
  __typename?: 'Preference';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  emergencyContactName?: Maybe<Scalars['String']['output']>;
  emergencyContactPhone?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  photoPermissions?: Maybe<Scalars['Boolean']['output']>;
  showPhoneNumber?: Maybe<Scalars['Boolean']['output']>;
  tshirtSize?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  electionCandidates: Array<Maybe<User>>;
  getActiveElections: Array<Maybe<Election>>;
  getActiveElectionsWithResults: Array<Maybe<Election>>;
  getDocs: Docs;
  getDuesLastReceived?: Maybe<SuccessTime>;
  getElection: Election;
  getElections: Array<Maybe<Election>>;
  getEvent: Event;
  getMembers: Array<Maybe<User>>;
  getMembershipLogItems: Array<Maybe<MembershipLogItem>>;
  getMessageRecipients: Array<Maybe<User>>;
  getNextEvent?: Maybe<Event>;
  getOfficer: User;
  getPastEvents: Array<Maybe<Event>>;
  getRegistration?: Maybe<User>;
  getResetToken: Scalars['String']['output'];
  getRunLeaders: Array<Maybe<User>>;
  getTrail?: Maybe<Trail>;
  getTrails: Array<Maybe<Trail>>;
  getUpcomingEvents: Array<Maybe<Event>>;
  getUserEvents: Array<Maybe<Event>>;
  getUserVote: Array<Maybe<Vote>>;
  myself?: Maybe<User>;
  newsletterPreferences: NewsletterPreference;
  notifications?: Maybe<UserMeta>;
  pastEventsCount: EventCount;
  runReportInfo?: Maybe<Event>;
  runReportUsers?: Maybe<Array<Maybe<User>>>;
  upcomingEventsCount: EventCount;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryElectionCandidatesArgs = {
  accountStatus: AccountStatus;
  accountType: AccountType;
};


export type QueryGetDuesLastReceivedArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetElectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetElectionsArgs = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetEventArgs = {
  eventId: Scalars['ID']['input'];
};


export type QueryGetMembersArgs = {
  accountStatuses?: InputMaybe<Array<InputMaybe<AccountStatus>>>;
  accountTypes?: InputMaybe<Array<InputMaybe<AccountType>>>;
};


export type QueryGetMembershipLogItemsArgs = {
  messageCode: MembershipMessageCode;
  username: Scalars['String']['input'];
};


export type QueryGetOfficerArgs = {
  office: Office;
};


export type QueryGetPastEventsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetRegistrationArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTrailArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetUpcomingEventsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserEventsArgs = {
  eventType?: InputMaybe<EventType>;
  username: Scalars['String']['input'];
};


export type QueryGetUserVoteArgs = {
  ballot?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNewsletterPreferencesArgs = {
  list?: InputMaybe<NewsletterList>;
};


export type QueryUpcomingEventsCountArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  accountStatus?: InputMaybe<Array<InputMaybe<AccountStatus>>>;
  accountType?: InputMaybe<Array<InputMaybe<AccountType>>>;
  office?: InputMaybe<Array<InputMaybe<Office>>>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role?: InputMaybe<Array<InputMaybe<Role>>>;
  titles?: InputMaybe<Array<InputMaybe<Title>>>;
};

export type Rsvp = {
  __typename?: 'RSVP';
  equipment?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  event: Event;
  guestCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isRider?: Maybe<Scalars['Boolean']['output']>;
  member: User;
  status: RsvpStatus;
  vehicle?: Maybe<Vehicle>;
};

export type RsvpInput = {
  equipment?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  guestCount?: InputMaybe<Scalars['Int']['input']>;
  isRider?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<RsvpStatus>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  vehicle?: InputMaybe<Scalars['ID']['input']>;
};

export enum RsvpStatus {
  CantGo = 'CANT_GO',
  Going = 'GOING',
  Maybe = 'MAYBE',
  None = 'NONE'
}

export type Registration = {
  __typename?: 'Registration';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  token: Scalars['String']['output'];
  tokenExpiry: Scalars['DateTime']['output'];
};

export type Result = {
  __typename?: 'Result';
  candidate?: Maybe<User>;
  count: Scalars['Int']['output'];
};

export type RigImage = {
  __typename?: 'RigImage';
  id: Scalars['ID']['output'];
  image?: Maybe<CloudinaryImage>;
};

export enum Role {
  Admin = 'ADMIN',
  Officer = 'OFFICER',
  RunLeader = 'RUN_LEADER',
  RunMaster = 'RUN_MASTER',
  User = 'USER'
}

export type RunReport = {
  __typename?: 'RunReport';
  conditions?: Maybe<Condition>;
  conditionsNotes?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<TrailDifficulty>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  event?: Maybe<Event>;
  favorite?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reportFiled?: Maybe<Scalars['DateTime']['output']>;
  reporter?: Maybe<User>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trail?: Maybe<Trail>;
  weather?: Maybe<Scalars['String']['output']>;
};

export type Sample = {
  __typename?: 'Sample';
  meow?: Maybe<Scalars['Int']['output']>;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type SuccessTime = {
  __typename?: 'SuccessTime';
  time?: Maybe<Scalars['DateTime']['output']>;
};

export enum Title {
  CharterMember = 'CHARTER_MEMBER',
  Historian = 'HISTORIAN',
  Webmaster = 'WEBMASTER'
}

export type Trail = {
  __typename?: 'Trail';
  address?: Maybe<Scalars['String']['output']>;
  avgDifficulty?: Maybe<TrailDifficulty>;
  avgRatings?: Maybe<Scalars['Float']['output']>;
  conditionsLastReported?: Maybe<Scalars['DateTime']['output']>;
  currentConditions?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  favoriteCount?: Maybe<Scalars['Int']['output']>;
  featuredImage?: Maybe<CloudinaryImage>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pastEvents?: Maybe<Array<Maybe<Event>>>;
  slug: Scalars['String']['output'];
  trailheadCoords?: Maybe<Scalars['String']['output']>;
  visitors?: Maybe<Array<Maybe<User>>>;
};

export enum TrailCondition {
  Clear = 'CLEAR',
  Closed = 'CLOSED',
  MajorIssues = 'MAJOR_ISSUES',
  MinorIssues = 'MINOR_ISSUES'
}

export enum TrailDifficulty {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Easy = 'EASY',
  Intermediate = 'INTERMEDIATE',
  Unknown = 'UNKNOWN'
}

export type TrailInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  newFeaturedImage?: InputMaybe<CloudinaryImageInput>;
  slug: Scalars['String']['input'];
  trailheadCoords?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertEventInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  changeDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime: Scalars['DateTime']['input'];
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  host: Scalars['String']['input'];
  maxAttendees?: InputMaybe<Scalars['Int']['input']>;
  maxRigs?: InputMaybe<Scalars['Int']['input']>;
  membersOnly?: InputMaybe<Scalars['Boolean']['input']>;
  newFeaturedImage?: InputMaybe<CloudinaryImageInput>;
  rallyAddress?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  trail?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<TrailDifficulty>;
  trailNotes?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  accountStatus?: Maybe<AccountStatus>;
  accountType?: Maybe<AccountType>;
  activityLog?: Maybe<Array<Maybe<ActivityLogItem>>>;
  avatar?: Maybe<CloudinaryImage>;
  bandaids?: Maybe<Array<Maybe<Bandaid>>>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  comfortLevel?: Maybe<TrailDifficulty>;
  contactInfo?: Maybe<ContactInfo>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  eventsLead?: Maybe<Array<Maybe<Event>>>;
  eventsRSVPd?: Maybe<Array<Maybe<Rsvp>>>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  joined?: Maybe<Scalars['DateTime']['output']>;
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  membershipLog?: Maybe<Array<Maybe<MembershipLogItem>>>;
  office?: Maybe<Office>;
  preferences?: Maybe<Preference>;
  rig?: Maybe<RigImage>;
  role: Role;
  runReportsLogged?: Maybe<Array<Maybe<RunReport>>>;
  runsAttendedCount?: Maybe<Scalars['Int']['output']>;
  titles?: Maybe<Array<Maybe<Title>>>;
  userMeta?: Maybe<UserMeta>;
  username?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<Vehicle>;
};

export type UserAdminUpdateInput = {
  accountStatus: Scalars['String']['input'];
  accountType: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  office?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  titles?: InputMaybe<Array<InputMaybe<Title>>>;
};

export type UserInput = {
  id: Scalars['ID']['input'];
};

export type UserMeta = {
  __typename?: 'UserMeta';
  accountSetupComplete?: Maybe<Scalars['Boolean']['output']>;
  emailMemberNotifications?: Maybe<Scalars['Boolean']['output']>;
  emailPublicNotifications?: Maybe<Scalars['Boolean']['output']>;
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  firstLoginComplete?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  oldSiteMigrationComplete?: Maybe<Scalars['Boolean']['output']>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<CloudinaryImageInput>;
  birthdate: Scalars['DateTime']['input'];
  city: Scalars['String']['input'];
  comfortLevel?: InputMaybe<TrailDifficulty>;
  contactInfoId?: InputMaybe<Scalars['ID']['input']>;
  emergencyContactName: Scalars['String']['input'];
  emergencyContactPhone: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  joined?: InputMaybe<Scalars['DateTime']['input']>;
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  preferencesId?: InputMaybe<Scalars['ID']['input']>;
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  username: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<CloudinaryImage>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  mods?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  outfitLevel?: Maybe<OutfitLevel>;
  rsvps?: Maybe<Array<Maybe<Rsvp>>>;
  trim?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['Int']['output'];
};

export type VehicleInput = {
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  mods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  outfitLevel?: InputMaybe<OutfitLevel>;
  trim?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type Vote = {
  __typename?: 'Vote';
  ballot: Ballot;
  candidate?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  voter: User;
};

export type VoteInput = {
  ballot: Scalars['ID']['input'];
  candidate?: InputMaybe<Scalars['ID']['input']>;
  dateTime: Scalars['DateTime']['input'];
};

export type YearlyArchive = {
  __typename?: 'YearlyArchive';
  monthlyArchives: Array<Maybe<MonthlyArchive>>;
  year: Scalars['String']['output'];
};

export type All_Users_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type All_Users_QueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, role: Role, accountStatus?: AccountStatus | null, accountType?: AccountType | null, office?: Office | null } | null> };

export type Update_Account_Status_MutationMutationVariables = Exact<{
  accountStatus?: InputMaybe<AccountStatus>;
  userId: Scalars['ID']['input'];
}>;


export type Update_Account_Status_MutationMutation = { __typename?: 'Mutation', updateAccountStatus?: { __typename?: 'User', id?: string | null, accountStatus?: AccountStatus | null } | null };

export type Update_Account_Type_MutationMutationVariables = Exact<{
  accountType?: InputMaybe<AccountType>;
  userId: Scalars['ID']['input'];
}>;


export type Update_Account_Type_MutationMutation = { __typename?: 'Mutation', updateAccountType?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null } | null };

export type Update_Office_MutationMutationVariables = Exact<{
  office?: InputMaybe<Office>;
  userId: Scalars['ID']['input'];
}>;


export type Update_Office_MutationMutation = { __typename?: 'Mutation', updateOffice?: { __typename?: 'User', id?: string | null, office?: Office | null } | null };

export type Update_Role_MutationMutationVariables = Exact<{
  role?: InputMaybe<Role>;
  userId: Scalars['ID']['input'];
}>;


export type Update_Role_MutationMutation = { __typename?: 'Mutation', updateRole?: { __typename?: 'User', id?: string | null, role: Role } | null };

export type Update_Title_MutationMutationVariables = Exact<{
  titles?: InputMaybe<Array<InputMaybe<Title>> | InputMaybe<Title>>;
  userId: Scalars['ID']['input'];
}>;


export type Update_Title_MutationMutation = { __typename?: 'Mutation', updateTitles?: { __typename?: 'User', id?: string | null, titles?: Array<Title | null> | null } | null };

export type New_Accounts_Approve_MutationMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type New_Accounts_Approve_MutationMutation = { __typename?: 'Mutation', unlockNewAccount: { __typename?: 'SuccessMessage', message?: string | null } };

export type New_Accounts_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type New_Accounts_QueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, birthdate?: any | null, gender?: Gender | null } | null> };

export type New_Accounts_Reject_MutationMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type New_Accounts_Reject_MutationMutation = { __typename?: 'Mutation', rejectNewAccount: { __typename?: 'SuccessMessage', message?: string | null } };

export type Admin_Profile_Header_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin_Profile_Header_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, role: Role, username?: string | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null } };

export type Quorum_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Quorum_QueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username?: string | null, id?: string | null, firstName?: string | null, lastName?: string | null, accountType?: AccountType | null, accountStatus?: AccountStatus | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null> };

export type Docs_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Docs_QueryQuery = { __typename?: 'Query', docs: { __typename?: 'Docs', bylaws: { __typename?: 'Document', name: string, link: string, date: any }, sors: { __typename?: 'Document', name: string, link: string, date: any }, archives: Array<{ __typename?: 'YearlyArchive', year: string, monthlyArchives: Array<{ __typename?: 'MonthlyArchive', month: string, meetingMinutes?: { __typename?: 'Document', name: string, link: string, date: any } | null, newsletter?: { __typename?: 'Document', name: string, link: string, date: any } | null } | null> } | null> } };

export type Delete_AvatarMutationVariables = Exact<{
  avatar: CloudinaryImageInput;
}>;


export type Delete_AvatarMutation = { __typename?: 'Mutation', deleteAvatar?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Update_AvatarMutationVariables = Exact<{
  data: ImageUpdateInput;
}>;


export type Update_AvatarMutation = { __typename?: 'Mutation', updateAvatar?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Dashboard_Upcoming_Events_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Dashboard_Upcoming_Events_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null } | null, events: Array<{ __typename?: 'Event', id: string, title: string, startTime?: any | null, membersOnly?: boolean | null, rsvps?: Array<{ __typename?: 'RSVP', status: RsvpStatus, member: { __typename?: 'User', id?: string | null } } | null> | null } | null> };

export type Next_Event_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Next_Event_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null } | null, event?: { __typename?: 'Event', id: string, title: string, startTime?: any | null, description?: string | null, endTime?: any | null, membersOnly?: boolean | null, trailDifficulty?: TrailDifficulty | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rsvps?: Array<{ __typename?: 'RSVP', id: string, status: RsvpStatus, member: { __typename?: 'User', id?: string | null } } | null> | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, trail?: { __typename?: 'Trail', id: string, name?: string | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null } | null };

export type Rsvp_MutationMutationVariables = Exact<{
  rsvp?: InputMaybe<RsvpInput>;
}>;


export type Rsvp_MutationMutation = { __typename?: 'Mutation', setRSVP?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Create_Event_MutationMutationVariables = Exact<{
  type: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<TrailDifficulty>;
  trailNotes?: InputMaybe<Scalars['String']['input']>;
  rallyAddress?: InputMaybe<Scalars['String']['input']>;
  membersOnly?: InputMaybe<Scalars['Boolean']['input']>;
  maxAttendees?: InputMaybe<Scalars['Int']['input']>;
  maxRigs?: InputMaybe<Scalars['Int']['input']>;
  changeDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  host: Scalars['String']['input'];
  trail?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  newFeaturedImage?: InputMaybe<CloudinaryImageInput>;
}>;


export type Create_Event_MutationMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Setup_New_Event_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Setup_New_Event_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null } | null, runLeaders: Array<{ __typename?: 'User', id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null } | null>, trails: Array<{ __typename?: 'Trail', id: string, name?: string | null } | null> };

export type Delete_Event_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Delete_Event_MutationMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Edit_Event_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<TrailDifficulty>;
  trailNotes?: InputMaybe<Scalars['String']['input']>;
  rallyAddress?: InputMaybe<Scalars['String']['input']>;
  membersOnly?: InputMaybe<Scalars['Boolean']['input']>;
  host: Scalars['String']['input'];
  trail?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  newFeaturedImage?: InputMaybe<CloudinaryImageInput>;
  maxAttendees?: InputMaybe<Scalars['Int']['input']>;
  maxRigs?: InputMaybe<Scalars['Int']['input']>;
  changeDisabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Edit_Event_MutationMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Setup_Existing_Event_QueryQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type Setup_Existing_Event_QueryQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, type: EventType, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, membersOnly?: boolean | null, address?: string | null, trailDifficulty?: TrailDifficulty | null, trailNotes?: string | null, rallyAddress?: string | null, maxAttendees?: number | null, maxRigs?: number | null, changeDisabled?: boolean | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string, publicId: string } | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, rsvps?: Array<{ __typename?: 'RSVP', id: string, status: RsvpStatus, member: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } } | null> | null, trail?: { __typename?: 'Trail', id: string, slug: string, name?: string | null, address?: string | null, avgDifficulty?: TrailDifficulty | null, avgRatings?: number | null, currentConditions?: string | null, conditionsLastReported?: any | null, favoriteCount?: number | null } | null }, runLeaders: Array<{ __typename?: 'User', id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null } | null>, trails: Array<{ __typename?: 'Trail', id: string, name?: string | null } | null> };

export type Delete_Event_ImageMutationVariables = Exact<{
  avatar: CloudinaryImageInput;
}>;


export type Delete_Event_ImageMutation = { __typename?: 'Mutation', deleteAvatar?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Update_Event_ImageMutationVariables = Exact<{
  data: ImageUpdateInput;
}>;


export type Update_Event_ImageMutation = { __typename?: 'Mutation', updateAvatar?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Event_QueryQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type Event_QueryQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, type: EventType } };

export type Past_Events_QueryQueryVariables = Exact<{
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Past_Events_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, totalEvents: { __typename?: 'EventCount', count?: number | null }, events: Array<{ __typename?: 'Event', id: string, title: string, startTime?: any | null, endTime?: any | null, membersOnly?: boolean | null, address?: string | null, rallyAddress?: string | null, trailDifficulty?: TrailDifficulty | null, maxRigs?: number | null, maxAttendees?: number | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null } | null, trail?: { __typename?: 'Trail', id: string, name?: string | null, avgDifficulty?: TrailDifficulty | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, rsvps?: Array<{ __typename?: 'RSVP', status: RsvpStatus, isRider?: boolean | null, guestCount?: number | null, member: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } } | null> | null } | null> };

export type Upcoming_Events_QueryQueryVariables = Exact<{
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Upcoming_Events_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, totalEvents: { __typename?: 'EventCount', count?: number | null }, events: Array<{ __typename?: 'Event', id: string, title: string, startTime?: any | null, endTime?: any | null, membersOnly?: boolean | null, address?: string | null, rallyAddress?: string | null, trailDifficulty?: TrailDifficulty | null, maxRigs?: number | null, maxAttendees?: number | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null } | null, trail?: { __typename?: 'Trail', id: string, name?: string | null, avgDifficulty?: TrailDifficulty | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, rsvps?: Array<{ __typename?: 'RSVP', status: RsvpStatus, isRider?: boolean | null, guestCount?: number | null, member: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } } | null> | null } | null> };

export type Non_Run_Event_QueryQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type Non_Run_Event_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null } | null, event: { __typename?: 'Event', id: string, type: EventType, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, membersOnly?: boolean | null, address?: string | null, maxAttendees?: number | null, changeDisabled?: boolean | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, rsvps?: Array<{ __typename?: 'RSVP', id: string, status: RsvpStatus, guestCount?: number | null, member: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, accountType?: AccountType | null, email?: string | null, runsAttendedCount?: number | null, contactInfo?: { __typename?: 'ContactInfo', id: string, city?: string | null, state?: string | null } | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } } | null> | null } };

export type Run_Event_QueryQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type Run_Event_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null, vehicle?: { __typename?: 'Vehicle', id: string, year: number, make: string, model: string } | null } | null, event: { __typename?: 'Event', id: string, type: EventType, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, membersOnly?: boolean | null, trailDifficulty?: TrailDifficulty | null, address?: string | null, rallyAddress?: string | null, maxRigs?: number | null, maxAttendees?: number | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, host?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null, rsvps?: Array<{ __typename?: 'RSVP', id: string, status: RsvpStatus, guestCount?: number | null, isRider?: boolean | null, equipment?: Array<string | null> | null, member: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, accountType?: AccountType | null, email?: string | null, runsAttendedCount?: number | null, contactInfo?: { __typename?: 'ContactInfo', id: string, city?: string | null, state?: string | null } | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, vehicle?: { __typename?: 'Vehicle', id: string, year: number, make: string, model: string, trim?: string | null } | null } } | null> | null, trail?: { __typename?: 'Trail', id: string, description?: string | null, name?: string | null, address?: string | null, avgDifficulty?: TrailDifficulty | null, avgRatings?: number | null, conditionsLastReported?: any | null, favoriteCount?: number | null, trailheadCoords?: string | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null } };

export type Change_Email_MutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type Change_Email_MutationMutation = { __typename?: 'Mutation', changeEmail?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Change_Password_MutationMutationVariables = Exact<{
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type Change_Password_MutationMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Request_Reset_MutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type Request_Reset_MutationMutation = { __typename?: 'Mutation', requestReset?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Login_MutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Login_MutationMutation = { __typename?: 'Mutation', login: { __typename?: 'SuccessMessage', message?: string | null } };

export type Logout_MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type Logout_MutationMutation = { __typename?: 'Mutation', logout?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Register_MutationMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  confirmEmail: Scalars['String']['input'];
  source: Scalars['String']['input'];
}>;


export type Register_MutationMutation = { __typename?: 'Mutation', register?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Reset_MutationMutationVariables = Exact<{
  resetToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type Reset_MutationMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null } };

export type Registration_QueryQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type Registration_QueryQuery = { __typename?: 'Query', getRegistration?: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null } | null };

export type Signup_MutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  gender: Gender;
  birthdate: Scalars['DateTime']['input'];
  token: Scalars['String']['input'];
}>;


export type Signup_MutationMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SuccessMessage', message?: string | null } };

export type Pay_Dues_MutationMutationVariables = Exact<{
  data: DuesPaymentInput;
}>;


export type Pay_Dues_MutationMutation = { __typename?: 'Mutation', payMembershipDues?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Submit_Run_Report_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<TrailDifficulty>;
  trailNotes?: InputMaybe<Scalars['String']['input']>;
  rallyAddress?: InputMaybe<Scalars['String']['input']>;
  membersOnly?: InputMaybe<Scalars['Boolean']['input']>;
  host: Scalars['String']['input'];
  trail?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  newFeaturedImage?: InputMaybe<CloudinaryImageInput>;
  maxAttendees?: InputMaybe<Scalars['Int']['input']>;
  maxRigs?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Submit_Run_Report_MutationMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Create_Trail_MutationMutationVariables = Exact<{
  trail: TrailInput;
}>;


export type Create_Trail_MutationMutation = { __typename?: 'Mutation', createTrail?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Edit_Trail_MutationMutationVariables = Exact<{
  trail: TrailInput;
  id: Scalars['ID']['input'];
}>;


export type Edit_Trail_MutationMutation = { __typename?: 'Mutation', updateTrail?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Existing_Trail_QueryQueryVariables = Exact<{
  trailSlug: Scalars['String']['input'];
}>;


export type Existing_Trail_QueryQuery = { __typename?: 'Query', trail?: { __typename?: 'Trail', id: string, name?: string | null, slug: string, description?: string | null, trailheadCoords?: string | null, address?: string | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null };

export type Update_Trail_ImageMutationVariables = Exact<{
  id: Scalars['String']['input'];
  image: CloudinaryImageInput;
}>;


export type Update_Trail_ImageMutation = { __typename?: 'Mutation', updateTrailImage?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Trails_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Trails_QueryQuery = { __typename?: 'Query', trails: Array<{ __typename?: 'Trail', id: string, slug: string, name?: string | null, description?: string | null, trailheadCoords?: string | null, address?: string | null, avgDifficulty?: TrailDifficulty | null, avgRatings?: number | null, currentConditions?: string | null, conditionsLastReported?: any | null, favoriteCount?: number | null, featuredImage?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, pastEvents?: Array<{ __typename?: 'Event', id: string, title: string } | null> | null, visitors?: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null } | null> | null } | null> };

export type Account_Form_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Account_Form_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, email?: string | null, accountType?: AccountType | null, accountStatus?: AccountStatus | null, eventsRSVPd?: Array<{ __typename?: 'RSVP', status: RsvpStatus, event: { __typename?: 'Event', id: string, type: EventType, startTime?: any | null } } | null> | null } | null, logItems: Array<{ __typename?: 'MembershipLogItem', id: string, time: any, message: string, logger?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null } | null } | null> };

export type Admin_Overview_QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type Admin_Overview_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, createdAt: any, joined?: any | null, lastLogin?: any | null }, duesLastReceived?: { __typename?: 'SuccessTime', time?: any | null } | null, meetings: Array<{ __typename?: 'Event', id: string, startTime?: any | null } | null>, runs: Array<{ __typename?: 'Event', id: string, startTime?: any | null } | null> };

export type Member_Admin_Profile_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Member_Admin_Profile_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, titles?: Array<Title | null> | null, office?: Office | null, role: Role, accountStatus?: AccountStatus | null, accountType?: AccountType | null } };

export type User_Admin_Update_Profile_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  titles?: InputMaybe<Array<InputMaybe<Title>> | InputMaybe<Title>>;
  office?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  accountStatus: Scalars['String']['input'];
  accountType: Scalars['String']['input'];
}>;


export type User_Admin_Update_Profile_MutationMutation = { __typename?: 'Mutation', updateUserAdminProfileSettings?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Edit_Newsletter_Prefs_MutationMutationVariables = Exact<{
  action: NewsletterAction;
  list: NewsletterList;
}>;


export type Edit_Newsletter_Prefs_MutationMutation = { __typename?: 'Mutation', editNewsletterPreferences?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Newsletter_Prefs_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Newsletter_Prefs_QueryQuery = { __typename?: 'Query', membersPref: { __typename?: 'NewsletterPreference', status?: NewsletterAction | null }, generalPref: { __typename?: 'NewsletterPreference', status?: NewsletterAction | null } };

export type Log_Membership_Item_MutationMutationVariables = Exact<{
  date: Scalars['DateTime']['input'];
  code: Scalars['String']['input'];
  message: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;


export type Log_Membership_Item_MutationMutation = { __typename?: 'Mutation', logMembershipEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Membership_Log_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Membership_Log_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, membershipLog?: Array<{ __typename?: 'MembershipLogItem', id: string, time: any, message: string, messageCode: MembershipMessageCode, logger?: { __typename?: 'User', id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null } | null } | null> | null } };

export type Message_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Message_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, role: Role, accountStatus?: AccountStatus | null, username?: string | null } | null, getMessageRecipients: Array<{ __typename?: 'User', id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null } | null> };

export type Send_Message_MutationMutationVariables = Exact<{
  to: Array<Scalars['String']['input']> | Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  htmlText: Scalars['String']['input'];
}>;


export type Send_Message_MutationMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Profile_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Profile_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, username?: string | null, joined?: any | null, firstName?: string | null, lastName?: string | null, email?: string | null, gender?: Gender | null, birthdate?: any | null, comfortLevel?: TrailDifficulty | null, contactInfo?: { __typename?: 'ContactInfo', id: string, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, phone?: string | null } | null, preferences?: { __typename?: 'Preference', id: string, updatedAt: any, emergencyContactName?: string | null, emergencyContactPhone?: string | null, photoPermissions?: boolean | null } | null } };

export type Member_Profile_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Member_Profile_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, gender?: Gender | null, birthdate?: any | null, email?: string | null, joined?: any | null, comfortLevel?: TrailDifficulty | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, publicId: string, url: string, smallUrl?: string | null } | null, contactInfo?: { __typename?: 'ContactInfo', id: string, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, phone?: string | null } | null, preferences?: { __typename?: 'Preference', id: string, emergencyContactName?: string | null, emergencyContactPhone?: string | null, photoPermissions?: boolean | null } | null } };

export type Self_Profile_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Self_Profile_QueryQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: string | null, accountType?: AccountType | null, accountStatus?: AccountStatus | null, firstName?: string | null, lastName?: string | null, username?: string | null, gender?: Gender | null, birthdate?: any | null, email?: string | null, joined?: any | null, comfortLevel?: TrailDifficulty | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, publicId: string, url: string, smallUrl?: string | null } | null, contactInfo?: { __typename?: 'ContactInfo', id: string, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, phone?: string | null } | null, preferences?: { __typename?: 'Preference', id: string, emergencyContactName?: string | null, emergencyContactPhone?: string | null, photoPermissions?: boolean | null } | null } | null };

export type User_Update_Profile_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  username: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  birthdate: Scalars['DateTime']['input'];
  joined?: InputMaybe<Scalars['DateTime']['input']>;
  contactInfoId?: InputMaybe<Scalars['ID']['input']>;
  street: Scalars['String']['input'];
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zip: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  preferencesId?: InputMaybe<Scalars['ID']['input']>;
  emergencyContactName: Scalars['String']['input'];
  emergencyContactPhone: Scalars['String']['input'];
  comfortLevel?: InputMaybe<TrailDifficulty>;
}>;


export type User_Update_Profile_MutationMutation = { __typename?: 'Mutation', updateUserProfileSettings?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Profile_Header_QueryQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type Profile_Header_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, role: Role, username?: string | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null } };

export type Rigbook_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Rigbook_QueryQuery = { __typename?: 'Query', president: { __typename?: 'User', username?: string | null, id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null } | null }, vicePresident: { __typename?: 'User', username?: string | null, id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null } | null }, secretary: { __typename?: 'User', username?: string | null, id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null } | null }, treasurer: { __typename?: 'User', username?: string | null, id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, titles?: Array<Title | null> | null, office?: Office | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null } | null }, membership: Array<{ __typename?: 'User', username?: string | null, id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, joined?: any | null, titles?: Array<Title | null> | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null } | null } | null> };

export type Membership_QueryQueryVariables = Exact<{
  accountStatus?: InputMaybe<Array<InputMaybe<AccountStatus>> | InputMaybe<AccountStatus>>;
  accountType?: InputMaybe<Array<InputMaybe<AccountType>> | InputMaybe<AccountType>>;
  role?: InputMaybe<Array<InputMaybe<Role>> | InputMaybe<Role>>;
  office?: InputMaybe<Array<InputMaybe<Office>> | InputMaybe<Office>>;
  titles?: InputMaybe<Array<InputMaybe<Title>> | InputMaybe<Title>>;
}>;


export type Membership_QueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username?: string | null, id?: string | null, firstName?: string | null, lastName?: string | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null, contactInfo?: { __typename?: 'ContactInfo', id: string, phone?: string | null } | null } | null> };

export type Activity_QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type Activity_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, activityLog?: Array<{ __typename?: 'ActivityLogItem', id: string, time: any, message: string } | null> | null } };

export type User_Update_Rig_MutationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  trim?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  outfitLevel?: InputMaybe<OutfitLevel>;
  mods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type User_Update_Rig_MutationMutation = { __typename?: 'Mutation', updateVehicle?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type User_RigQueryVariables = Exact<{ [key: string]: never; }>;


export type User_RigQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, publicId: string, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, year: number, make: string, model: string, trim?: string | null, name?: string | null, outfitLevel?: OutfitLevel | null, mods?: Array<string | null> | null } | null } };

export type Garage_QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type Garage_QueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, firstName?: string | null, rig?: { __typename?: 'RigImage', image?: { __typename?: 'CloudinaryImage', id?: string | null, url: string } | null } | null, vehicle?: { __typename?: 'Vehicle', id: string, make: string, model: string, year: number, trim?: string | null, name?: string | null, outfitLevel?: OutfitLevel | null, mods?: Array<string | null> | null } | null } };

export type Delete_RigMutationVariables = Exact<{
  rig: CloudinaryImageInput;
}>;


export type Delete_RigMutation = { __typename?: 'Mutation', deleteRig?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Update_RigMutationVariables = Exact<{
  data: ImageUpdateInput;
}>;


export type Update_RigMutation = { __typename?: 'Mutation', updateRig?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Create_Election_Candidates_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Create_Election_Candidates_QueryQuery = { __typename?: 'Query', electionCandidates: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', url: string } | null } | null> };

export type Edit_Election_Candidates_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Edit_Election_Candidates_QueryQuery = { __typename?: 'Query', getElection: { __typename?: 'Election', id: string, electionName: string, startTime?: any | null, endTime?: any | null, races?: Array<{ __typename?: 'Ballot', id: string, title: string, desc?: string | null, candidates: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', url: string } | null }>, results?: Array<{ __typename?: 'Result', count: number, candidate?: { __typename?: 'User', id?: string | null } | null } | null> | null } | null> | null }, electionCandidates: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'CloudinaryImage', url: string } | null } | null> };

export type Get_Election_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Get_Election_QueryQuery = { __typename?: 'Query', getElection: { __typename?: 'Election', electionName: string, races?: Array<{ __typename?: 'Ballot', id: string, title: string, candidates: Array<{ __typename?: 'User', id?: string | null, joined?: any | null, firstName?: string | null, lastName?: string | null, username?: string | null, role: Role, avatar?: { __typename?: 'CloudinaryImage', url: string } | null, vehicle?: { __typename?: 'Vehicle', year: number, make: string, model: string, trim?: string | null, image?: { __typename?: 'CloudinaryImage', id?: string | null, smallUrl?: string | null } | null } | null }> } | null> | null } };

export type Get_User_VoteQueryVariables = Exact<{
  ballot?: InputMaybe<Scalars['ID']['input']>;
}>;


export type Get_User_VoteQuery = { __typename?: 'Query', getUserVote: Array<{ __typename?: 'Vote', candidate?: { __typename?: 'User', id?: string | null } | null } | null> };

export type Get_Active_ElectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Active_ElectionsQuery = { __typename?: 'Query', getActiveElections: Array<{ __typename?: 'Election', id: string, electionName: string, endTime?: any | null } | null> };

export type Submit_Election_MutationMutationVariables = Exact<{
  election: ElectionInput;
}>;


export type Submit_Election_MutationMutation = { __typename?: 'Mutation', submitElection?: { __typename?: 'Election', id: string } | null };

export type Log_Activity_MessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
  messageCode: Scalars['String']['input'];
  time: Scalars['DateTime']['input'];
  username: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
}>;


export type Log_Activity_MessageMutation = { __typename?: 'Mutation', logActivityEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Log_Membership_MessageMutationVariables = Exact<{
  date: Scalars['DateTime']['input'];
  code: Scalars['String']['input'];
  message: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;


export type Log_Membership_MessageMutation = { __typename?: 'Mutation', logMembershipEvent?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Current_User_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Current_User_QueryQuery = { __typename?: 'Query', myself?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, firstName?: string | null, role: Role, accountStatus?: AccountStatus | null, accountType?: AccountType | null, avatar?: { __typename?: 'CloudinaryImage', id?: string | null, url: string, smallUrl?: string | null } | null } | null };


export const All_Users_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ALL_USERS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"office"}}]}}]}}]} as unknown as DocumentNode<All_Users_QueryQuery, All_Users_QueryQueryVariables>;
export const Update_Account_Status_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_ACCOUNT_STATUS_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}}]}}]}}]} as unknown as DocumentNode<Update_Account_Status_MutationMutation, Update_Account_Status_MutationMutationVariables>;
export const Update_Account_Type_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_ACCOUNT_TYPE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<Update_Account_Type_MutationMutation, Update_Account_Type_MutationMutationVariables>;
export const Update_Office_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_OFFICE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"office"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Office"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOffice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"Variable","name":{"kind":"Name","value":"office"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"office"}}]}}]}}]} as unknown as DocumentNode<Update_Office_MutationMutation, Update_Office_MutationMutationVariables>;
export const Update_Role_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_ROLE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<Update_Role_MutationMutation, Update_Role_MutationMutationVariables>;
export const Update_Title_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_TITLE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"titles"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Title"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTitles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"titles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"titles"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}}]}}]}}]} as unknown as DocumentNode<Update_Title_MutationMutation, Update_Title_MutationMutationVariables>;
export const New_Accounts_Approve_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NEW_ACCOUNTS_APPROVE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlockNewAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<New_Accounts_Approve_MutationMutation, New_Accounts_Approve_MutationMutationVariables>;
export const New_Accounts_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NEW_ACCOUNTS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"LOCKED"}]}},{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"GUEST"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]} as unknown as DocumentNode<New_Accounts_QueryQuery, New_Accounts_QueryQueryVariables>;
export const New_Accounts_Reject_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NEW_ACCOUNTS_REJECT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectNewAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<New_Accounts_Reject_MutationMutation, New_Accounts_Reject_MutationMutationVariables>;
export const Admin_Profile_Header_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ADMIN_PROFILE_HEADER_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Admin_Profile_Header_QueryQuery, Admin_Profile_Header_QueryQueryVariables>;
export const Quorum_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QUORUM_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"ACTIVE"},{"kind":"EnumValue","value":"PAST_DUE"}]}},{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"FULL"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}}]}}]}}]} as unknown as DocumentNode<Quorum_QueryQuery, Quorum_QueryQueryVariables>;
export const Docs_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DOCS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"docs"},"name":{"kind":"Name","value":"getDocs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bylaws"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"archives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyArchives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"meetingMinutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newsletter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Docs_QueryQuery, Docs_QueryQueryVariables>;
export const Delete_AvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_AVATAR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Delete_AvatarMutation, Delete_AvatarMutationVariables>;
export const Update_AvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_AVATAR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Update_AvatarMutation, Update_AvatarMutationVariables>;
export const Dashboard_Upcoming_Events_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DASHBOARD_UPCOMING_EVENTS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"events"},"name":{"kind":"Name","value":"getUpcomingEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"IntValue","value":"7"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<Dashboard_Upcoming_Events_QueryQuery, Dashboard_Upcoming_Events_QueryQueryVariables>;
export const Next_Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NEXT_EVENT_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"getNextEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trailDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Next_Event_QueryQuery, Next_Event_QueryQueryVariables>;
export const Rsvp_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RSVP_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rsvp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RSVPInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRSVP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rsvp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rsvp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Rsvp_MutationMutation, Rsvp_MutationMutationVariables>;
export const Create_Event_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CREATE_EVENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailDifficulty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeDisabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailDifficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rallyAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"membersOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxAttendees"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxRigs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"changeDisabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeDisabled"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trail"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"featuredImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newFeaturedImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Create_Event_MutationMutation, Create_Event_MutationMutationVariables>;
export const Setup_New_Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SETUP_NEW_EVENT_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"runLeaders"},"name":{"kind":"Name","value":"getRunLeaders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"trails"},"name":{"kind":"Name","value":"getTrails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Setup_New_Event_QueryQuery, Setup_New_Event_QueryQueryVariables>;
export const Delete_Event_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_EVENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Delete_Event_MutationMutation, Delete_Event_MutationMutationVariables>;
export const Edit_Event_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EDIT_EVENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailDifficulty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeDisabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailDifficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rallyAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"membersOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trail"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"featuredImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newFeaturedImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxAttendees"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxRigs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"changeDisabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeDisabled"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Edit_Event_MutationMutation, Edit_Event_MutationMutationVariables>;
export const Setup_Existing_Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SETUP_EXISTING_EVENT_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"getEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"trailDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"trailNotes"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avgDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"avgRatings"}},{"kind":"Field","name":{"kind":"Name","value":"currentConditions"}},{"kind":"Field","name":{"kind":"Name","value":"conditionsLastReported"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rallyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttendees"}},{"kind":"Field","name":{"kind":"Name","value":"maxRigs"}},{"kind":"Field","name":{"kind":"Name","value":"changeDisabled"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"runLeaders"},"name":{"kind":"Name","value":"getRunLeaders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"trails"},"name":{"kind":"Name","value":"getTrails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Setup_Existing_Event_QueryQuery, Setup_Existing_Event_QueryQueryVariables>;
export const Delete_Event_ImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_EVENT_IMAGE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Delete_Event_ImageMutation, Delete_Event_ImageMutationVariables>;
export const Update_Event_ImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_EVENT_IMAGE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Update_Event_ImageMutation, Update_Event_ImageMutationVariables>;
export const Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EVENT_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"getEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<Event_QueryQuery, Event_QueryQueryVariables>;
export const Past_Events_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PAST_EVENTS_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"totalEvents"},"name":{"kind":"Name","value":"pastEventsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"events"},"name":{"kind":"Name","value":"getPastEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"rallyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"trailDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"maxRigs"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttendees"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avgDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isRider"}},{"kind":"Field","name":{"kind":"Name","value":"guestCount"}}]}}]}}]}}]} as unknown as DocumentNode<Past_Events_QueryQuery, Past_Events_QueryQueryVariables>;
export const Upcoming_Events_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UPCOMING_EVENTS_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"totalEvents"},"name":{"kind":"Name","value":"upcomingEventsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"events"},"name":{"kind":"Name","value":"getUpcomingEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"rallyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"trailDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"maxRigs"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttendees"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avgDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isRider"}},{"kind":"Field","name":{"kind":"Name","value":"guestCount"}}]}}]}}]}}]} as unknown as DocumentNode<Upcoming_Events_QueryQuery, Upcoming_Events_QueryQueryVariables>;
export const Non_Run_Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NON_RUN_EVENT_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"getEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"runsAttendedCount"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"guestCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttendees"}},{"kind":"Field","name":{"kind":"Name","value":"changeDisabled"}}]}}]}}]} as unknown as DocumentNode<Non_Run_Event_QueryQuery, Non_Run_Event_QueryQueryVariables>;
export const Run_Event_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RUN_EVENT_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"getEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"membersOnly"}},{"kind":"Field","name":{"kind":"Name","value":"trailDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"rsvps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"runsAttendedCount"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"guestCount"}},{"kind":"Field","name":{"kind":"Name","value":"isRider"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avgDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"avgRatings"}},{"kind":"Field","name":{"kind":"Name","value":"conditionsLastReported"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"trailheadCoords"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rallyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"maxRigs"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttendees"}}]}}]}}]} as unknown as DocumentNode<Run_Event_QueryQuery, Run_Event_QueryQueryVariables>;
export const Change_Email_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CHANGE_EMAIL_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Change_Email_MutationMutation, Change_Email_MutationMutationVariables>;
export const Change_Password_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CHANGE_PASSWORD_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Change_Password_MutationMutation, Change_Password_MutationMutationVariables>;
export const Request_Reset_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"REQUEST_RESET_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Request_Reset_MutationMutation, Request_Reset_MutationMutationVariables>;
export const Login_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOGIN_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Login_MutationMutation, Login_MutationMutationVariables>;
export const Logout_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOGOUT_MUTATION"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Logout_MutationMutation, Logout_MutationMutationVariables>;
export const Register_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"REGISTER_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Register_MutationMutation, Register_MutationMutationVariables>;
export const Reset_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RESET_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<Reset_MutationMutation, Reset_MutationMutationVariables>;
export const Registration_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"REGISTRATION_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<Registration_QueryQuery, Registration_QueryQueryVariables>;
export const Signup_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SIGNUP_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Gender"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthdate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Signup_MutationMutation, Signup_MutationMutationVariables>;
export const Pay_Dues_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PAY_DUES_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DuesPaymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payMembershipDues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Pay_Dues_MutationMutation, Pay_Dues_MutationMutationVariables>;
export const Submit_Run_Report_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SUBMIT_RUN_REPORT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailDifficulty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailDifficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailDifficulty"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trailNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rallyAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rallyAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"membersOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersOnly"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trail"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"featuredImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featuredImage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newFeaturedImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newFeaturedImage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxAttendees"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAttendees"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxRigs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxRigs"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Submit_Run_Report_MutationMutation, Submit_Run_Report_MutationMutationVariables>;
export const Create_Trail_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CREATE_TRAIL_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"trail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Create_Trail_MutationMutation, Create_Trail_MutationMutationVariables>;
export const Edit_Trail_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EDIT_TRAIL_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"trail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trail"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Edit_Trail_MutationMutation, Edit_Trail_MutationMutationVariables>;
export const Existing_Trail_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EXISTING_TRAIL_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trailSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trail"},"name":{"kind":"Name","value":"getTrail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trailSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trailheadCoords"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<Existing_Trail_QueryQuery, Existing_Trail_QueryQueryVariables>;
export const Update_Trail_ImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_TRAIL_IMAGE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrailImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Update_Trail_ImageMutation, Update_Trail_ImageMutationVariables>;
export const Trails_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TRAILS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trails"},"name":{"kind":"Name","value":"getTrails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trailheadCoords"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avgDifficulty"}},{"kind":"Field","name":{"kind":"Name","value":"avgRatings"}},{"kind":"Field","name":{"kind":"Name","value":"currentConditions"}},{"kind":"Field","name":{"kind":"Name","value":"conditionsLastReported"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"pastEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visitors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<Trails_QueryQuery, Trails_QueryQueryVariables>;
export const Account_Form_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACCOUNT_FORM_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"eventsRSVPd"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"logItems"},"name":{"kind":"Name","value":"getMembershipLogItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"StringValue","value":"self","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"messageCode"},"value":{"kind":"EnumValue","value":"DUES_PAID"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"logger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<Account_Form_QueryQuery, Account_Form_QueryQueryVariables>;
export const Admin_Overview_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ADMIN_OVERVIEW_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"duesLastReceived"},"name":{"kind":"Name","value":"getDuesLastReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"meetings"},"name":{"kind":"Name","value":"getUserEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventType"},"value":{"kind":"EnumValue","value":"MEETING"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"runs"},"name":{"kind":"Name","value":"getUserEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventType"},"value":{"kind":"EnumValue","value":"RUN"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]} as unknown as DocumentNode<Admin_Overview_QueryQuery, Admin_Overview_QueryQueryVariables>;
export const Member_Admin_Profile_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MEMBER_ADMIN_PROFILE_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<Member_Admin_Profile_QueryQuery, Member_Admin_Profile_QueryQueryVariables>;
export const User_Admin_Update_Profile_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"USER_ADMIN_UPDATE_PROFILE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"titles"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Title"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"office"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserAdminProfileSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"titles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"titles"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"office"},"value":{"kind":"Variable","name":{"kind":"Name","value":"office"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<User_Admin_Update_Profile_MutationMutation, User_Admin_Update_Profile_MutationMutationVariables>;
export const Edit_Newsletter_Prefs_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EDIT_NEWSLETTER_PREFS_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewsletterAction"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewsletterList"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editNewsletterPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}},{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Edit_Newsletter_Prefs_MutationMutation, Edit_Newsletter_Prefs_MutationMutationVariables>;
export const Newsletter_Prefs_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NEWSLETTER_PREFS_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"membersPref"},"name":{"kind":"Name","value":"newsletterPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"EnumValue","value":"MEMBERS"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"generalPref"},"name":{"kind":"Name","value":"newsletterPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"EnumValue","value":"GENERAL"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Newsletter_Prefs_QueryQuery, Newsletter_Prefs_QueryQueryVariables>;
export const Log_Membership_Item_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_MEMBERSHIP_ITEM_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logMembershipEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Log_Membership_Item_MutationMutation, Log_Membership_Item_MutationMutationVariables>;
export const Membership_Log_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MEMBERSHIP_LOG_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"membershipLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"messageCode"}},{"kind":"Field","name":{"kind":"Name","value":"logger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Membership_Log_QueryQuery, Membership_Log_QueryQueryVariables>;
export const Message_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MESSAGE_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getMessageRecipients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<Message_QueryQuery, Message_QueryQueryVariables>;
export const Send_Message_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SEND_MESSAGE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"htmlText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"htmlText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"htmlText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Send_Message_MutationMutation, Send_Message_MutationMutationVariables>;
export const Profile_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PROFILE_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactName"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"photoPermissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comfortLevel"}}]}}]}}]} as unknown as DocumentNode<Profile_QueryQuery, Profile_QueryQueryVariables>;
export const Member_Profile_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MEMBER_PROFILE_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactName"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"photoPermissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comfortLevel"}}]}}]}}]} as unknown as DocumentNode<Member_Profile_QueryQuery, Member_Profile_QueryQueryVariables>;
export const Self_Profile_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SELF_PROFILE_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactName"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"photoPermissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comfortLevel"}}]}}]}}]} as unknown as DocumentNode<Self_Profile_QueryQuery, Self_Profile_QueryQueryVariables>;
export const User_Update_Profile_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"USER_UPDATE_PROFILE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joined"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactInfoId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferencesId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emergencyContactName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emergencyContactPhone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comfortLevel"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrailDifficulty"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfileSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"birthdate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"joined"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joined"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contactInfoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactInfoId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"zip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zip"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"preferencesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferencesId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"emergencyContactName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emergencyContactName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"emergencyContactPhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emergencyContactPhone"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comfortLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comfortLevel"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<User_Update_Profile_MutationMutation, User_Update_Profile_MutationMutationVariables>;
export const Profile_Header_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PROFILE_HEADER_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Profile_Header_QueryQuery, Profile_Header_QueryQueryVariables>;
export const Rigbook_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RIGBOOK_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"president"},"name":{"kind":"Name","value":"getOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"EnumValue","value":"PRESIDENT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"vicePresident"},"name":{"kind":"Name","value":"getOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"EnumValue","value":"VICE_PRESIDENT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"secretary"},"name":{"kind":"Name","value":"getOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"EnumValue","value":"SECRETARY"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"treasurer"},"name":{"kind":"Name","value":"getOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"EnumValue","value":"TREASURER"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"membership"},"name":{"kind":"Name","value":"getMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountTypes"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"FULL"},{"kind":"EnumValue","value":"ASSOCIATE"},{"kind":"EnumValue","value":"EMERITUS"}]}},{"kind":"Argument","name":{"kind":"Name","value":"accountStatuses"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"ACTIVE"},{"kind":"EnumValue","value":"PAST_DUE"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"titles"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}}]}}]}}]}}]} as unknown as DocumentNode<Rigbook_QueryQuery, Rigbook_QueryQueryVariables>;
export const Membership_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MEMBERSHIP_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"office"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Office"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"titles"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Title"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"Variable","name":{"kind":"Name","value":"office"}}},{"kind":"Argument","name":{"kind":"Name","value":"titles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"titles"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<Membership_QueryQuery, Membership_QueryQueryVariables>;
export const Activity_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ACTIVITY_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"activityLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<Activity_QueryQuery, Activity_QueryQueryVariables>;
export const User_Update_Rig_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"USER_UPDATE_RIG_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"make"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trim"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"outfitLevel"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OutfitLevel"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mods"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"vehicle"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"make"},"value":{"kind":"Variable","name":{"kind":"Name","value":"make"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"trim"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trim"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"outfitLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"outfitLevel"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mods"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<User_Update_Rig_MutationMutation, User_Update_Rig_MutationMutationVariables>;
export const User_RigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"USER_RIG"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"outfitLevel"}},{"kind":"Field","name":{"kind":"Name","value":"mods"}}]}}]}}]}}]} as unknown as DocumentNode<User_RigQuery, User_RigQueryVariables>;
export const Garage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GARAGE_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"rig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"outfitLevel"}},{"kind":"Field","name":{"kind":"Name","value":"mods"}}]}}]}}]}}]} as unknown as DocumentNode<Garage_QueryQuery, Garage_QueryQueryVariables>;
export const Delete_RigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_RIG"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rig"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloudinaryImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rig"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rig"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Delete_RigMutation, Delete_RigMutationVariables>;
export const Update_RigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_RIG"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Update_RigMutation, Update_RigMutationVariables>;
export const Create_Election_Candidates_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CREATE_ELECTION_CANDIDATES_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"electionCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"EnumValue","value":"FULL"}},{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"EnumValue","value":"ACTIVE"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<Create_Election_Candidates_QueryQuery, Create_Election_Candidates_QueryQueryVariables>;
export const Edit_Election_Candidates_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EDIT_ELECTION_CANDIDATES_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getElection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"electionName"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"electionCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"EnumValue","value":"FULL"}},{"kind":"Argument","name":{"kind":"Name","value":"accountStatus"},"value":{"kind":"EnumValue","value":"ACTIVE"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<Edit_Election_Candidates_QueryQuery, Edit_Election_Candidates_QueryQueryVariables>;
export const Get_Election_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_ELECTION_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getElection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"electionName"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"joined"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"trim"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_Election_QueryQuery, Get_Election_QueryQueryVariables>;
export const Get_User_VoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_USER_VOTE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ballot"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ballot"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ballot"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<Get_User_VoteQuery, Get_User_VoteQueryVariables>;
export const Get_Active_ElectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_ACTIVE_ELECTIONS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActiveElections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"electionName"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<Get_Active_ElectionsQuery, Get_Active_ElectionsQueryVariables>;
export const Submit_Election_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SUBMIT_ELECTION_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"election"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitElection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"election"},"value":{"kind":"Variable","name":{"kind":"Name","value":"election"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Submit_Election_MutationMutation, Submit_Election_MutationMutationVariables>;
export const Log_Activity_MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_ACTIVITY_MESSAGE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"time"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logActivityEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"time"},"value":{"kind":"Variable","name":{"kind":"Name","value":"time"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Log_Activity_MessageMutation, Log_Activity_MessageMutationVariables>;
export const Log_Membership_MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_MEMBERSHIP_MESSAGE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logMembershipEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Log_Membership_MessageMutation, Log_Membership_MessageMutationVariables>;
export const Current_User_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CURRENT_USER_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myself"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"smallUrl"}}]}}]}}]}}]} as unknown as DocumentNode<Current_User_QueryQuery, Current_User_QueryQueryVariables>;