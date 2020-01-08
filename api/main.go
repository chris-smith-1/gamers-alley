package main

import(
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"encoding/json"
	// "github.com/davecgh/go-spew/spew"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"
	"html/template"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

type product struct{
	ProductID int `json:"product_id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
	Image string `json:"image"`
}

//User EXPORTED
type User struct{
	ID int `json:"id"`
	Email string `json:"email"`
	Password string `json:"password"`
}

//JWT EXPORTED
type JWT struct{
	Token string `json:"token"`
}

//Error EXPORTED
type Error struct{
	Message string `json:"message"`
}

var tpl *template.Template
var db *sql.DB

func init(){
	tpl = template.Must(template.ParseGlob("templates/*.gohtml"))
}
 
func main() {
  var err error
  db, err = sql.Open("mysql", "root:strongpassword!123@tcp(127.0.0.1:3306)/gamers_alley")
 
  if err != nil {
    panic(err.Error())
  }
 
  defer db.Close()
  err = db.Ping()
 
  router := mux.NewRouter()
 
  
  router.HandleFunc("/", index)
  router.HandleFunc("/signup", signup).Methods("POST")
  router.HandleFunc("/login", login).Methods("POST")
  router.HandleFunc("/protected", TokenVerifyMiddleware(protectedEndpoint)).Methods("GET")

  log.Println("Listening on port 8000...")
  log.Fatal(http.ListenAndServe(":8000", router))
}

func index(w http.ResponseWriter, r *http.Request){
	tpl.ExecuteTemplate(w, "index.gohtml", nil)
}

func respondWithError(w http.ResponseWriter, status int, error Error){
		w.WriteHeader(status)
		fmt.Println(status)
		json.NewEncoder(w).Encode(error)
}

func responseJSON(w http.ResponseWriter, data interface{}){
	json.NewEncoder(w).Encode(data)
}

// func productDetail(w http.ResponseWriter, r *http.Request){
// 	p := product{name:""}
// }

func signup(w http.ResponseWriter, r *http.Request){
	enableCors(&w)

	var user User
	var error Error

	json.NewDecoder(r.Body).Decode(&user)

	if user.Email == ""{
		error.Message = "Email is missing"
		respondWithError(w, http.StatusBadRequest, error)
		return
	}
	if user.Password == ""{
		error.Message = "Password is missing"
		respondWithError(w, http.StatusBadRequest, error)
		return
	}

	// spew.Dump(user)
	
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil{
		panic(err.Error())
	}

	// fmt.Println("pass text", user.Password)
	// fmt.Println("hash", hash)
	
	user.Password = string(hash)

	// fmt.Println(user.Password)

	stmt1 := "INSERT INTO users(email, password) VALUES(?,?);"
	stmt2 := "SELECT LAST_INSERT_ID()"

	db.QueryRow(stmt1, user.Email, user.Password)
	err = db.QueryRow(stmt2).Scan(&user.ID)

	if err != nil{
		error.Message = "Server error."
		respondWithError(w, http.StatusInternalServerError, error)
		return
	}

	user.Password = ""
	
	w.Header().Set("Content-Type", "application/json")

	responseJSON(w, user)

}

//GenerateToken EXPORTED
func GenerateToken(user User)(string, error){
	var err error
	secret := "secret"

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"iss": "course",
	})

	tokenString, err := token.SignedString([]byte(secret))

	if err != nil{
		panic(err.Error())
	}

	return tokenString, nil
}

func login(w http.ResponseWriter, r *http.Request){
	var user User
	var jwt JWT
	var error Error

	json.NewDecoder(r.Body).Decode(&user)

	if user.Email == ""{
		error.Message = "Email is missing."
		respondWithError(w, http.StatusBadRequest, error)
		return
	}

	if user.Password == ""{
		error.Message = "Password is missing."
		respondWithError(w, http.StatusBadRequest, error)
		return
	}

	password := user.Password

	row := db.QueryRow("SELECT * FROM users WHERE email = ?", user.Email)
	err := row.Scan(&user.ID, &user.Email, &user.Password)

	if err != nil{
		if err == sql.ErrNoRows{
			error.Message = "The user does not exist"
			respondWithError(w, http.StatusBadRequest, error)
			return
		}else{
			panic(err.Error())
		}
	}

	hashedPassword := user.Password

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))

	if err != nil{
		error.Message = "Invalid Password"
		respondWithError(w, http.StatusUnauthorized, error)
		return
	}

	token, err := GenerateToken(user)

	if err != nil {
		panic(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	jwt.Token = token

	responseJSON(w, jwt)
}

func protectedEndpoint(w http.ResponseWriter, r *http.Request){
	fmt.Println("protectedEndpoint invoked")
}

//TokenVerifyMiddleware EXPORTED
func TokenVerifyMiddleware(next http.HandlerFunc) http.HandlerFunc{
	fmt.Println("TokenVerifyMiddleware invoked")
	return nil
}