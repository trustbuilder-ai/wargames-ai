import { client } from "../backend_client/client.gen";
import { BACKEND_URL } from "../config";
import { supabase } from "./supabase";

/**
 * Set up the API client with the backend URL and authentication interceptor.
 * This should be called once at app initialization.
 */
export function setupApiClient() {
  // Configure base URL from config
  client.setConfig({
    baseUrl: BACKEND_URL, // https://wargames-ai-backend-357559285333.us-west1.run.app
  });

  // Set up authentication interceptor to add Bearer token to requests
  client.interceptors.request.use(async (request) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      request.headers.set("Authorization", `Bearer ${session.access_token}`);
    }
    return request;
  });
}
