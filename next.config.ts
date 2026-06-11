import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "fivepass.daksa.ia.br"],
    },
  },
}

export default nextConfig
