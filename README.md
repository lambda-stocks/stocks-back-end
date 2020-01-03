# Routes

## Restful Root
- https://lambdastockbe.herokuapp.com/
  - GET 200 Message: Server is up and running
  - GET 500: Internal Error
  
### Users

#### getUserById
- Required: users `id`

#### register
- Required: first_name, last_name, email, password
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

#### login 
- Required: email, password
- Returned: welcome message and token 
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

### Stocks

#### createStock
- Required: name, open, high, low, close
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

#### updateStock
- Required: stock_id, open, high, low, close
- POST 200: results
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

#### deleteStock
- Required: stock_id
- DELETE 400 Message: stock_id is required

#### getStockByAttribute
- Required: logged in user
- GET 500 Message: Internal Error

#### getStocks
- GET 200: Stock list
- GET 500 Message: Internal Error

### Watchlists

#### getWatchlists
- GET 200: Watchlist results
- GET 500 Message: Internal Error

#### watchAStock
- Required: user_id, stock_id
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

### Portfolios

#### createPortfolio
- Required: user_id
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

#### getPortfolios
- GET 200: Portfolio results
- GET 500 Message: Internal Error

### Notifications 

#### createNotifications
- Required: user_id, message
- POST 400 Message: Add required items
- POST 500 Message: Internal Error

#### getNotifications
- GET 200: Notification results
- GET 500 Message: Internal Error

## Graphql Root
- https://lambdastockbe.herokuapp.com/graphql
