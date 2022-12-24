const getOnlyFirstName = (fullName?: string | null): string => {
  if (!fullName) return "";

  const [firstName] = fullName.split(" ");

  return firstName;
};

export const Utils = { getOnlyFirstName };
