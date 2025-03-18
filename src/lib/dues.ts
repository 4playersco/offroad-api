import {
  DEFAULT_FULL_MEMBER_DUES_AMOUNT,
  DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT,
} from "@/ui/constants";

export const getFullMemberDuesAmount = () => {
  return parseInt(
    process.env.FULL_MEMBERSHIP_DUES ?? String(DEFAULT_FULL_MEMBER_DUES_AMOUNT),
    10
  );
};

export const getAssociateMemberDuesAmount = () => {
  return parseInt(
    process.env.ASSOCIATE_MEMBERSHIP_DUES ??
      String(DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT),
    10
  );
};

export const getDuesAmount = (
  fullMemberCount = 1,
  associateMemberCount = 0,
  includeFees = false
) => {
  // Current: Stripe
  // 2.9% + $0.30 per transaction
  const fullMemberDues =
    parseInt(
      process.env.FULL_MEMBERSHIP_DUES ??
        String(DEFAULT_FULL_MEMBER_DUES_AMOUNT),
      10
    ) * fullMemberCount;

  const associateMemberDues =
    parseInt(
      process.env.ASSOCIATE_MEMBERSHIP_DUES ??
        String(DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT),
      10
    ) * associateMemberCount;

  const dues = fullMemberDues + associateMemberDues;

  return includeFees ? Number(((dues + 0.3) / (1 - 0.029)).toFixed(2)) : dues;
};

export const convertToCents = (dollarAmt: number) => {
  return dollarAmt * 100;
};
