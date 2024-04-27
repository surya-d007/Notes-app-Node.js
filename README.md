# Notes Application

## Description
The Notes Application is a web-based platform that allows users to create accounts, log in, and create and save notes. Users can securely store their credentials using MongoDB, and their saved notes will be associated with their profiles, ensuring easy access every time they log in.

## Features
- User Authentication: Users can create accounts and log in securely.
- Notes Creation: Users can create and save notes in the form of text.
- MongoDB Integration: User credentials and saved notes are stored in a MongoDB database.
- Persistent Storage: Saved notes are associated with user profiles and fetched from the database upon login.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** bcrypt.js, JSON Web Tokens (JWT)
- **ORM/ODM:** Mongoose

## Setup Instructions
1. **Clone the repository:**
    ```bash
    git clone https://github.com/surya-d007/Notes-app-Node.js.git
    ```

2. **Install dependencies:**
    ```bash
    cd notes-application
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env` file in the server directory.
    - Add the following variables:
        ```plaintext
        PORT=3000
        MONGO_DB=<your-mongodb-uri>
        ```

4. **Start the server:**
    ```bash
    npm start
    ```

5. **Access the application:**
    - Open your web browser and navigate to `http://localhost:3000`.

## Usage
1. **Registration:**
    - Navigate to the registration page.
    - Enter your details and submit the form.
  
2. **Login:**
    - Once registered, navigate to the login page.
    - Enter your credentials to log in.
  
3. **Create Notes:**
    - After logging in, navigate to the notes section.
    - Use the provided form to create and save notes.
  
4. **View Saved Notes:**
    - Your saved notes will be displayed in the notes section.
  
5. **Logout:**
    - To log out, click on the logout button.

## Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

## License
[MIT License](LICENSE)
