const TEST_DATE_STORAGE_KEY = "todoAppTestingDate";

export const localDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const getTestingDate = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return sessionStorage.getItem(TEST_DATE_STORAGE_KEY) || undefined;
};

export const setTestingDate = (date: string | undefined): void => {
  if (typeof window === "undefined") return;
  if (date) {
    sessionStorage.setItem(TEST_DATE_STORAGE_KEY, date);
  } else {
    sessionStorage.removeItem(TEST_DATE_STORAGE_KEY);
  }
};

export const getAppNow = (): Date => {
  const testingDate = getTestingDate();
  if (!testingDate) return new Date();

  const now = new Date();
  const simulated = new Date(`${testingDate}T00:00:00`);
  simulated.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  return simulated;
};
