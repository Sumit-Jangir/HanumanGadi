/**
 * Centralized API utility with separate methods for GET, POST, PUT, PATCH, DELETE
 * Includes optional headers, body, and query parameters
 */
import axios, { AxiosRequestConfig } from "axios";
import { getStorage, clearStorage } from "./storage";
// import Router from "next/router";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Fallback to localhost if env variable is not set
// NOTE: Make sure BASE_URL matches your backend and is reachable from your frontend.
// If you see network errors, check CORS settings and server status.
// const BASE_URL = "http://api-dev.buildsync.net/api/v1";

type QueryParams = Record<string, string | number>;
type Headers = Record<string, string>;

// const router = useRouter();
// Helper to build query string
const buildQuery = (params?: QueryParams) => {
  if (!params) return "";
  const query = new URLSearchParams(params as any).toString();
  return query ? `?${query}` : "";
};

// Helper to attach token (if available)
const getAuthHeaders = (headers?: Headers): Headers => {
  if (typeof window !== "undefined") {
    const userToken = getStorage("token"); // or get from cookies
    if (userToken) {
      return { token: `Bearer ${userToken}`, ...headers };
    }
  }
  return headers || {};
};

// Generic fetch handler
export const fetcher = async <T = any>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<T> => {
 const fullUrl = `${BASE_URL}${url}`;
  try {
    const response = await axios({
      url: fullUrl,
      ...options,
      // headers: {
      //   "Content-Type": "application/json",
      //   ...(options?.headers || {}),
      // },
    });

    return response.data as T;
  } catch (error: any) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Handle 401 Unauthorized errors
    if (status === 401) {
      console.warn("Unauthorized access detected. Logging out...");
      clearStorage(); // Clear user data from storage
      // // redirect("/auth/sign-up");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      // // router.reload(); // Reload the page to ensure the state is cleared
      return Promise.reject(new Error("Unauthorized. Redirecting to sign-in."));
    }

    // If we have response data from the API, throw it as is to preserve the structure
    if (responseData) {
      const errorWithResponse = new Error(responseData.message || "API request failed");
      (errorWithResponse as any).response = responseData;
      (errorWithResponse as any).status = responseData.status;
      (errorWithResponse as any).statusCode = responseData.statusCode;
      (errorWithResponse as any).message = responseData.message;
      throw errorWithResponse;
    }

    // Fallback for network errors or other issues
    const message = error.message || "API request failed";
    throw new Error(`Error ${status || ""}: ${message}`);
  }
};

/**
 * GET request
 */
export const apiGet = async <T = any>(
  url: string,
  queryParams?: QueryParams,
  headers?: Headers,
) => {
  const fullUrl = `${url}${buildQuery(queryParams)}`;
  return fetcher<T>(fullUrl, {
    method: "GET",
    headers: getAuthHeaders(headers),
  });
};

/**
 * POST request
 */
export const apiPost = async <T = any>(url: string, data?: any, headers?: Headers) => {
  return fetcher<T>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(headers) },
    data,
  });
};

/**
 * PUT request
 */
export const apiPut = async <T = any>(url: string, data?: any, headers?: Headers) => {
  return fetcher<T>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(headers) },
    data,
  });
};

/**
 * PATCH request
 */
export const apiPatch = async <T = any>(url: string, data?: any, headers?: Headers) => {
  return fetcher<T>(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(headers) },
    data,
  });
};

/**
 * DELETE request
 */
export const apiDelete = async <T = any>(url: string, data?: any, headers?: Headers) => {
  return fetcher<T>(url, {
    method: "DELETE",
    headers: getAuthHeaders(headers),
    data,
  });
};

/**
 * USAGE EXAMPLES
 */

// // GET all users with query params
// const users = await apiGet("/users", { role: "admin" });

// // POST a new user (registration)
// const newUser = await apiPost("/auth/register", {
//   username: "john_doe",
//   email: "john@example.com",
//   password: "Hello@123"
// });

// // PUT update user (replace fields)
// const updatedUser = await apiPut("/users/123", {
//   name: "Jane Doe",
//   role: "manager"
// });

// // PATCH update user (partial fields)
// const partialUpdate = await apiPatch("/users/123", {
//   email: "jane@example.com"
// });

// // DELETE a user
// await apiDelete("/users/123");
