import { createClient } from "@sanity/client";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
};

/** Public read-only client — uses CDN in production */
export const sanityClient = createClient({
  ...config,
  useCdn: process.env.NODE_ENV === "production",
});

/** Server-only write client — never import in client components */
export const sanityWriteClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
