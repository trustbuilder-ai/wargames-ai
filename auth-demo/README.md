### Backend client:

Client generated with command:

```
npx @hey-api/openapi-ts   -i ~/Projects/trustbuilder-ai/wargames-ai-backend/openapi.json   -o src/backend_client
```

**See contents of test-health-check.ts for simple client use**

Run:

```
npx tsx test-health-check.ts
```

### Environment:

Set `SUPABASE_PUBLIC_ANON_KEY` to supabase anonymous key or add to .env.

### Backend host:

The backend host (repo: wargames-ai-backend) is running here (as of JULY/27/2025):

`https://wargames-ai-backend-357559285333.us-west1.run.app`
