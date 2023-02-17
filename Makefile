up-db:
		docker-compose up
down-db:
		docker-compose down			
up-api:
		nodemon --exec go run main.go --signal SIGTERM