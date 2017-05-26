curl "http://localhost:4741/sign-in" --include --request POST \
  --header "Content-Type: application/json" \
  --data '{
      "credentials": {
          "email": "ccc",
          "password": "c"
      }
    }'

# data output from curl doesn't have a trailing newline
echo

curl "http://tic-tac-toe.wdibos.com/change-password/111" --include -- request PATCH \
  --header:  "Content-Type: application/json" \
  --data '{
      "Authorization": {
        "Token token=BAhJIiUwMTJjMGYyOTdkODdmYjAzN2I0ZDdjOThlNDk1MzQ1YgY6BkVG--12e3df3e10318705af4c654b5d9eb393385ec417"
        }
      }' \
  --data: '{
      "passwords": {
        "old": "k3na",
        "new": "k3na"
      }
    }'

# data output from curl doesn't have a trailing newline
echo
