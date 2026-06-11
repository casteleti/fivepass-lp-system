// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null
let _available = false

export async function getRedis(): Promise<{ client: { ping: () => Promise<string> } | null; available: boolean }> {
  if (_client) return { client: _client as { ping: () => Promise<string> }, available: _available }

  try {
    const { createClient } = await import("redis")
    const client = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" })
    await client.connect()
    _client = client
    _available = true
    return { client: client as unknown as { ping: () => Promise<string> }, available: true }
  } catch {
    _available = false
    return { client: null, available: false }
  }
}
