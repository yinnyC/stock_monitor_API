# stock_monitor_API

This is an API which you can create your own watchlist so that you can monitor the stock price and have it shown on your wifi-display

## Getting Started
First thing first, you need to create an account!
```
clone this API
```
## Resources

|Module|Fields|Relationship|
| ---: | :------|:------|
|user| <ul><li>user_name - String</li><li>password - String</li><li>stocks - Lists</li></ul> |[One-to-Many] One user can have many stocks|
|stock|<ul><li>symbol - String</li><li>current_price - Number</li></ul> |[Many-to-one] stock can be saved by many users| 