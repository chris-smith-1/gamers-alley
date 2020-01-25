FROM golang

COPY . /api

RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/dgrijalva/jwt-go
RUN go get github.com/gorilla/mux
RUN go get github.com/davecgh/go-spew/spew

RUN go run main.go