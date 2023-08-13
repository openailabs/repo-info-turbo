# rnd notes

## Todo list

✅ reflect the code of repo detail
create an api key after user authenticated
improve the perforcemence of api key validation process
query DB in every request currentlly
there need a cache or KV to cache the data who is requesting

## Change logs

## API invoking

```shell
curl --request POST \
  --url http://localhost:8002/api/trpc/chrome/mark.saveMark?batch=1 \
  --header 'Content-Type: application/json' \
  --header 'X-Api-Key: sk_live_xkbiparcywf75m95' \
  --data '{
    "0": {
        "json": {
            "id":"9dgsz2howq2fblks",
            "owner": "facebook",
            "name": "react",
            "tags": [
                "AAAAMMMMMMM",
                "BBB",
                "好标签"
            ],
            "note": "good repo 111 222 33333333 333443434444444"
        }
    }
}'
```

```shell

curl --location 'http://localhost:8002/api/trpc/chrome/mark.getMark?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22owner%22%3A%22Significant-Gravitas%22%2C%22name%22%3A%22Auto-GPT%22%7D%7D%7D' \
--header 'Accept: */*' \
--header 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh-TW;q=0.6,zh;q=0.5,th;q=0.4' \
--header 'Connection: keep-alive' \
--header 'Origin: https://github.com' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: cross-site' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
--header 'X-Api-Key: sk_live_xkbiparcywf75m95' \
--header 'content-type: application/json' \
--header 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"'
```
