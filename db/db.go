package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

func Init() *bun.DB {
	pass := os.Getenv("DB_PASSWORD")
	db_user := os.Getenv("DB_USER")
	db_name := os.Getenv("DB_NAME")
	db_port_host := os.Getenv("DB_PORT_HOST")
	dbURL := "postgresql://" + db_user + ":" + pass + db_port_host + db_name

	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dbURL)))

	db := bun.NewDB(sqldb, pgdialect.New())
	// if db connection fails this wont run
	fmt.Println("server connected with db successfully")

	return db
}
