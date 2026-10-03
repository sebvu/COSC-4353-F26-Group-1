export type VerifyPair = {
  field: string;
  input: string;
  verifier: (val: string) => boolean; // Returns TRUE if there is an ERROR
  errMsg: string;
};

export const verifyInput = (verifyPairs: VerifyPair[]) => {
  const errors: Record<string, string> = {};
  let hasError = false;

  for (const pair of verifyPairs) {
    // If we haven't already logged an error for this field, check it
    if (!errors[pair.field] && pair.verifier(pair.input)) {
      errors[pair.field] = pair.errMsg;
      hasError = true;
    }
  }

  return { hasError, errors };
};
