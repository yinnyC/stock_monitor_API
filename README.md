# 📈 stock_monitor_API

Check out the [API DOCUMENTATION HERE](https://yinnyc.github.io/stock_monitor_API/)

This is an API which you can create your own watchlist so that you can monitor the stock price and have it shown on your wifi-display

👉👉👉 [https://mystock-monitor.herokuapp.com/](https://mystock-monitor.herokuapp.com/)

## 🔥 Getting Started

First thing first, you need to create an account with the [Authentication Methods](#Authentication-Methods), then you can start making stock price queries!

### 🔐 Authentication Methods

- #### Sign Up  | **Post** |

  - The Sign Up API can create an account and you will be automatically signed into the system so that you can go ahead and start using Stock API features.
  - How : Make a **Post** request with the request of your **username** and **password** to this path below

   👉 [https://mystock-monitor.herokuapp.com/auth/sign-up](https://mystock-monitor.herokuapp.com/auth/sign-up)

    ```JSON
    {
      "username":"your_username",
      "password":"your_password"
    }
    ```

- #### Log In | **Post** |

  - The Log In API can sign you into the system so that you can go ahead and start using Stock API features.
  - How : Make a **Post** request with the request of your **username** and **password** to this path below

   👉 [https://mystock-monitor.herokuapp.com/auth/login](https://mystock-monitor.herokuapp.com/auth/login)

    ```JSON
    {
      "username":"your_username",
      "password":"your_password"
    }
    ```

- #### Log Out | **GET** |

  - The Log Out API can sign you out while you finish.
  - How: Make a **GET** request to this path below

   👉 [https://mystock-monitor.herokuapp.com/auth/logout](https://mystock-monitor.herokuapp.com/auth/logout)

### 📈  Stock Methods

- #### Save Stock | **POST** |

  - The Save Stock API will add the stock into your watchlist
  - How: Make a **POST** request with the body of the **STOCK SYMBOL** to the path below.

  👉 [https://mystock-monitor.herokuapp.com/stock/addStock](https://mystock-monitor.herokuapp.com/stock/addStock)

    ```JSON
    {
      "symbol":"AAPL"
    }
    ```

- #### Remove Stock | **DELETE** |

  - The Remove Stock API will remove the stock into your.
  - How: How: Make a **DELETE** request with the body of the **STOCK SYMBOL** to the path below.

  👉 [https://mystock-monitor.herokuapp.com/stock/remove](https://mystock-monitor.herokuapp.com/stock/remove)

    ```JSON
    {
      "symbol":"AAPL"
    }
    ```

- #### Watchlist | **GET** |

  - The Watchlist API will return all the stock price information in the watchlist.
  - How: Make a **GET** request to the path

  👉 [https://mystock-monitor.herokuapp.com/stock/watchlist](https://mystock-monitor.herokuapp.com/stock/watchlist)

- ####  Stock Price | **PUT** |

  - The Stock Price API will make an API call to to update and return most recent stock price of the stock you query.
  and update the stock price
  - How: Make a **PUT** request with the body of the **STOCK SYMBOL** to the path below.

    👉 [https://mystock-monitor.herokuapp.com/stock/recentPrice](https://mystock-monitor.herokuapp.com/stock/recentPrice)

    ```JSON
    {
      "symbol":"AAPL"
    }
    ```

## Resources

|Module|Fields|Relationship|
| ---: | :------|:------|
|user| <ul><li>user_name - String</li><li>password - String</li><li>stocks - Lists</li></ul> |[One-to-Many] One user can have many stocks|
|stock|<ul><li>symbol - String</li><li>current_price - Number</li></ul> |[Many-to-one] stock can be saved by many users| 