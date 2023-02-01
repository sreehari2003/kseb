#================================
#== GOLANG ENVIRONMENT
#================================
GO := @go
GIN := @gin

goinstall:
	${GO} get .

godev:
	${GIN} -a 4000 -p 3001 -b bin/main run main.go

goprod:
	${GO} build -o main .

gotest:
	${GO} test -v

goformat:
	${GO} fmt ./...