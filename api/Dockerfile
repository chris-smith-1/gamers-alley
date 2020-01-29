FROM golang

RUN mkdir -p /user/src/api-test

WORKDIR /user/src/api-test

COPY . .

RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/dgrijalva/jwt-go
RUN go get github.com/gorilla/mux
RUN go get github.com/davecgh/go-spew/spew
RUN go get golang.org/x/crypto/bcrypt

RUN go build -o main .

EXPOSE 8000

EXPOSE 3300

CMD ["./main"]