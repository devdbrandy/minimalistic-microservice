# Generate JsonPatch

API endpoint that generates jsonpatch of json document

- **URL Endpoint:** `/api/v1/jsonpatch`
- **Method:** `POST`
- **URL Params:** `None`
- **Request Body:**
  
  | Name       | Type   | Required           | Description |
  | ---------- | ------ | ------------------ | ----------- |
  | `document` | `json` | :white_check_mark: | Json Object |
  | `patch`    | `json` | :white_check_mark: | Json Patch  |

- **Success Response**
  - **Code:** `200 OK`
  - **Content:**

  ```http
    {
      "user": {...}
    }
  ```
