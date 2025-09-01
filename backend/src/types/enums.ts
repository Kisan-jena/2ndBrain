// HTTP Status Codes Enum
export enum HttpStatusCode {
  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx Redirection  
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}

// Response Messages Enum
export enum ResponseMessage {
  // Success Messages
  SUCCESS = "Operation successful",
  CREATED = "Resource created successfully",
  UPDATED = "Resource updated successfully",
  DELETED = "Resource deleted successfully",
  
  // Authentication Messages
  LOGIN_SUCCESS = "Login successful",
  LOGOUT_SUCCESS = "Logout successful",
  REGISTRATION_SUCCESS = "Registration successful",
  TOKEN_REFRESHED = "Token refreshed successfully",
  
  // Error Messages
  UNAUTHORIZED = "Authentication required",
  FORBIDDEN = "Access denied",
  NOT_FOUND = "Resource not found",
  BAD_REQUEST = "Invalid request data",
  VALIDATION_ERROR = "Validation failed",
  DUPLICATE_ENTRY = "Resource already exists",
  INTERNAL_ERROR = "Internal server error",
  
  // User-specific Messages
  USER_NOT_FOUND = "User not found",
  INVALID_CREDENTIALS = "Invalid input data",
  EMAIL_ALREADY_EXISTS = "Email already registered",
  WEAK_PASSWORD = "Password must be at least 8 characters",
  
  // Content-specific Messages
  CONTENT_NOT_FOUND = "Content not found",
  CONTENT_CREATED = "Content saved successfully",
  CONTENT_UPDATED = "Content updated successfully",
  CONTENT_DELETED = "Content deleted successfully",
  
  // Tag-specific Messages
  TAG_NOT_FOUND = "Tag not found",
  TAG_CREATED = "Tag created successfully",
  TAG_ALREADY_EXISTS = "Tag already exists",
  
  // Link-specific Messages
  INVALID_LINK = "Invalid or expired link",
  SHARING_DISABLED = "Sharing is disabled",
  LINK_GENERATED = "Shareable link generated"
}

// Content Types Enum


// User Roles Enum
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator"
}

// JWT Token Types
export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
  RESET = "reset",
  VERIFICATION = "verification"
}

// Database Operations
export enum DatabaseOperation {
  CREATE = "create",
  READ = "read", 
  UPDATE = "update",
  DELETE = "delete"
}

// API Response Status
export enum ApiStatus {
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
  FAILED = "failed"
}
