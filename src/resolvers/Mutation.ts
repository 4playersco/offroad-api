import {
  docsResolvers,
  userResolvers,
  eventResolvers,
  electionResolvers,
  messagingResolvers,
  adminResolvers,
  runReportResolvers,
  accountResolvers,
  trailResolvers,
} from "./partials";

const Mutation = {
  ...userResolvers.mutations,
  ...eventResolvers.mutations,
  ...electionResolvers.mutations,
  ...trailResolvers.mutations,
  ...docsResolvers.mutations,
  ...messagingResolvers.mutations,
  ...adminResolvers.mutations,
  ...runReportResolvers.mutations,
  ...accountResolvers.mutations,
};

export default Mutation;
