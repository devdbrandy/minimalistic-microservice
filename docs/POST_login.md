# Account login

API endpoint that represents an account login

- **URL Endpoint:** `/login`
- **Method:** `POST`
- **URL Params:** `None`
- **Request Body:**
  
  | Name       | Type     | Required           | Description   |
  | ---------- | -------- | ------------------ | ------------- |
  | `username` | `string` | :white_check_mark: | Username      |
  | `password` | `string` | :white_check_mark: | User password |

- **Success Response**
  - **Code:** `200 OK`
  - **Content:**

  ```http
    {
      "user": {}
    }
  ```
