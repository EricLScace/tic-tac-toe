curl "http://tic-tac-toe.wdibos.com//games/111" --include --request GET \
  --header "Content-Type: application/json" \
  --data '{
      "Authorization": {
        "Token  token=BAhJIiU2OTBjODBiNWZjNTQwYzhiZWJkMjlmMjhmOWE1MTg2ZQY6BkVG--66b702eecd07809e238ccf702a6bac156fbc993f"
        }
      }'

# data output from curl does not have a trailing newline
echo
