import { GoalProps } from "../../components/Goal";
import { GoalStatus } from "../../components/Status";

const getOnlyFirstName = (fullName?: string | null): string => {
  if (!fullName) return "";

  const [firstName] = fullName.split(" ");

  return firstName;
};

const sortGoalsData = (goalsData: GoalProps[]) => {
  goalsData.sort((a, b) => {
    // ? Compare by status
    const statusOrder = {
      [GoalStatus.InProgress]: 1,
      [GoalStatus.Paused]: 2,
      [GoalStatus.NotStarted]: 3,
      [GoalStatus.Finished]: 4,
    };

    const statusComparison = statusOrder[a.status] - statusOrder[b.status];
    if (statusComparison !== 0) return statusComparison;

    // ? If status is the same, compare by the fraction of totalAccomplished / totalToAccomplish
    const fractionA = a.totalAccomplished
      ? a.totalAccomplished / a.totalToAccomplish
      : 0;
    const fractionB = b.totalAccomplished
      ? b.totalAccomplished / b.totalToAccomplish
      : 0;

    const fractionComparison = fractionB - fractionA;
    if (fractionComparison !== 0) return fractionComparison;

    // ? If the fraction is the same, compare by priority
    return b.priority - a.priority;
  });

  return [...goalsData];
};

export const Utils = { getOnlyFirstName, sortGoalsData };
