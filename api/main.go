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
)

//Product EXPORTED
type Product struct{
	ProductID int `json:"product_id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
	Image1 string `json:"image_1"`
	Image2 string `json:"image_2"`
	Image3 string `json:"image_3"`
	Image4 string `json:"image_4"`
	Image5 string `json:"image_5"`
}

//ProductID EXPORTED
type ProductID struct{
	ProductID int `json:"product_id"`
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

//HELPER FUNCTION
func respondWithError(w http.ResponseWriter, status int, error Error){
	w.WriteHeader(status)
	fmt.Println(status)
	json.NewEncoder(w).Encode(error)
}

func responseJSON(w http.ResponseWriter, data interface{}){
json.NewEncoder(w).Encode(data)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

//GLOBAL VARIABLES
var db *sql.DB
 
func main() {
  var err error
  db, err = sql.Open("mysql", "root:strongpassword!123@tcp(127.0.0.1:3306)/gamers_alley")
  //os.Getenv in screenshot from Grant. Enter after '"mysql" ,'
 
  if err != nil {
    panic(err.Error())
  }
 
  defer db.Close()
  err = db.Ping()
 
  router := mux.NewRouter()
  
  router.HandleFunc("/product-detail/{id}", productDetail).Methods("GET")
  router.HandleFunc("/products", fetchProducts).Methods("GET")
  router.HandleFunc("/signup", signup).Methods("POST")
  router.HandleFunc("/login", login).Methods("POST")
  router.HandleFunc("/protected", TokenVerifyMiddleware(protectedEndpoint)).Methods("GET")

  log.Println("Listening on port 8000...")
  log.Fatal(http.ListenAndServe(":8000", router))
}

func productDetail(w http.ResponseWriter, r *http.Request){
	enableCors(&w)

	var resProd Product
	var error Error
	params := mux.Vars(r)

	stmt := "SELECT * FROM products WHERE product_id = ?;"
	row := db.QueryRow(stmt, params["id"])

	err := row.Scan(&resProd.ProductID, &resProd.Name, &resProd.Description, &resProd.Price, &resProd.Image1, &resProd.Image2, &resProd.Image3, &resProd.Image4, &resProd.Image5)

	if err != nil{
		respondWithError(w, http.StatusBadRequest, error)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	responseJSON(w, resProd)
}

func fetchProducts(w http.ResponseWriter, r *http.Request){
	enableCors(&w)

	var products Product
	
	stmt := "SELECT product_id, name, image_1 FROM products;"
	row := db.QueryRow(stmt)

	err := row.Scan(&products.ProductID, &products.Name, &products.Image1)

	if err != nil {
		panic(err.Error())
	}
}

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

	w.WriteHeader(http.StatusCreated)

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