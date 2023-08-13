# API invoking

```shell
curl --request POST \
  --url http://localhost:8002/api/trpc/chrome/mark.saveMark \
  --header 'Content-Type: application/json' \
  --header 'X-Api-Key: sk_live_xkbiparcywf75m95' \
  --data '{
    "id": "owner/repo",
    "owner": "owner",
    "name": "repo",
    "userId": "U11002",
    "tags":{"tags":[{"id":"abc","text":"abc"}]},
    "note": "This is a test note"
  }'
```
