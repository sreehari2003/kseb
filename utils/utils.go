package utils

type result interface {
	result()
}

type Response struct {
	ok      bool
	message string
	status  int
	err     error
	data    interface{}
}
