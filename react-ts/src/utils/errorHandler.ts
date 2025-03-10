// Error codes and messages for Account Abstraction
const AA_ERROR_CODES: { [key: string]: string } = {
  'AA00': 'Sender already constructed',
  'AA01': 'Initcode must return sender',
  'AA10': 'Sender doesn\'t have enough funds to pay for prefund',
  'AA13': 'Invalid paymasterAndData',
  'AA20': 'Account not deployed and no initcode',
  'AA21': 'Didn\'t pay prefund',
  'AA22': 'Unsupported signature aggregator',
  'AA23': 'Signature error',
  'AA24': 'Invalid nonce',
  'AA25': 'Missing paymaster stake or data',
  'AA30': 'Paymaster deposit too low',
  'AA31': 'Paymaster stake too low',
  'AA32': 'Paymaster unstaked or not stable yet',
  'AA33': 'Paymaster post-operation failed',
  'AA40': 'Over verification gas limit',
  'AA41': 'Over maximum operation size',
  'AA50': 'Transaction reverted during simulation',
  'AA51': 'Transaction would fail or has failed on-chain',
  'PM01': 'Paymaster token error',
  'PM02': 'Paymaster rate error',
  'PM03': 'Paymaster balance error',
};

/**
 * Extract error code from error message
 * 
 * @param error The error object
 * @returns Error code or null if not found
 */
export const extractErrorCode = (error: any): string | null => {
  if (!error) return null;
  
  // TODO: Implement error code extraction
  return null;
};

/**
 * Get a readable error message
 * 
 * @param error The error object
 * @returns Readable error message
 */
export const getReadableErrorMessage = (error: any): string => {
  // TODO: Implement readable error message extraction
  
  // If no specific error identified, return the original message
  return error?.message || String(error);
};

/**
 * Check if error is related to paymaster issues
 * 
 * @param error Error object
 * @returns True if error is related to paymaster
 */
export const isPaymasterError = (error: any): boolean => {
  // TODO: Implement paymaster error check
  
  return false;
};

/**
 * Handle common errors and return user-friendly messages
 * 
 * @param error Error object
 * @returns User-friendly error message
 */
export const handleError = (error: any): string => {
  // TODO: Implement comprehensive error handling
  
  return getReadableErrorMessage(error);
}; 