# KSEB API

## Prerequisites

* Go
* Git

Install dependencies:
` go get `

Install the `swag` and `gin-swagger` packages:

```
go get -u github.com/swaggo/swag/cmd/swag
go get -u github.com/swaggo/gin-swagger
```

Generate the Swagger documentation:
```
swag init
```

## Configuration
Create a .env file in the root directory of the project and specify the following environment variables:
`PORT=8080`

<br>
go run main.go

```
The API should now be running on `http://localhost:<PORT>`.

## Conclusion

With these steps, you should be able to set up and run the KSEB API, along with its Swagger documentation, on your local machine.
```