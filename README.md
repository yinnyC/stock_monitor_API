# stock_monitor_API

This is an API which you can create your own watchlist so that you can monitor the stock price and have it shown on your wifi-display

## Resources

|Module|Fields|Relationship|
| ---: | :------|:------|
|user| <ul><li>user_name - String</li><li>password - String</li><li>stocks - Lists</li></ul> |[One-to-Many] One user can have many stocks|
|stock|<ul><li>symbol - String</li><li>current_price - Number</li></ul> |[Many-to-Many] stock can be saved by many users|

## Potential Challenge

- Free API can only make 5 api calls per minutes, need to figure out a way to limit the flow
