# Generate Image Thumbnail

API endpoint that generates image thumbnail

- **URL Endpoint:** `/api/v1/thumbnail`
- **Method:** `POST`
- **URL Params:** `None`
- **Request Body:**
  
  | Name       | Type     | Required           | Description |
  | ---------- | -------- | ------------------ | ----------- |
  | `imageUrl` | `string` | :white_check_mark: | Image url   |

- **Success Response**
  - **Code:** `200 OK`
  - **Content:**

  ```http
    {
      "message": "Thumbnail successfully created.",
      "link": "http://localhost:3000/thumbnails/thumb-202004095847.jpeg"
    }
  ```
