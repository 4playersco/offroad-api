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

const Query = {
  ...userResolvers.queries,
  ...eventResolvers.queries,
  ...electionResolvers.queries,
  ...docsResolvers.queries,
  ...messagingResolvers.queries,
  ...adminResolvers.queries,
  ...runReportResolvers.queries,
  ...accountResolvers.queries,
  ...trailResolvers.queries,
};

export default Query;
