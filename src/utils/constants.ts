// Messages
export const MESSAGES = {
  // Generic
  SUCCESS: "Action completed successfully in BuildSync.",
  ERROR: "Something went wrong. Please try again or contact support.",
  LOADING: "Processing your request, please wait...",
  UNAUTHORIZED: "You are not authorized to perform this action in BuildSync.",
  FORBIDDEN: "Access denied. Please contact your project administrator.",
  NOT_FOUND: "The requested record was not found in BuildSync.",

  // Auth
  LOGIN_SUCCESS: "Login successful. Welcome to BuildSync.",
  LOGOUT_SUCCESS: "You have been logged out of BuildSync.",
  LOGIN_FAILED: "Invalid credentials. Please check and try again.",
  SESSION_EXPIRED: "Your session has expired. Please log in to continue.",

  // Validation
  REQUIRED_FIELD: "This field is mandatory for the workflow.",
  INVALID_EMAIL: "Please provide a valid email address.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  INVALID_PHONE: "Please provide a valid phone number.",

  // Actions (aligned with EPC flows)
  CREATE_SUCCESS: "Request created successfully in BuildSync.",
  UPDATE_SUCCESS: "Request updated successfully.",
  DELETE_SUCCESS: "Record deleted successfully.",
  SAVE_SUCCESS: "Changes saved in BuildSync.",

  // Network
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT: "Request timed out. Please try again.",

  // Data
  NO_DATA: "No records available in BuildSync.",
  FETCH_SUCCESS: "Data retrieved successfully from BuildSync.",

  // EPC Specific
  MATERIAL_REQUEST_SUCCESS: "Material request submitted successfully.",
  MACHINE_REQUEST_SUCCESS: "Machine request submitted successfully.",
  DP_REQUEST_SUCCESS: "Direct Procurement request submitted successfully.",
  APPROVAL_SUCCESS: "Approval recorded successfully.",
  REJECTION_SUCCESS: "Request rejected successfully.",
  STATUS_UPDATE: "Request status updated in BuildSync.",
};