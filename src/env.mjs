import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_WORLDCOIN_APP_ID: z.string().min(1),
    NEXT_PUBLIC_SIGNER: z.string().startsWith("0x", "Must start with 0x"),
  },
  // Only need to destructure client variables
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_WORLDCOIN_APP_ID: process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID,
    NEXT_PUBLIC_SIGNER: process.env.NEXT_PUBLIC_SIGNER,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
