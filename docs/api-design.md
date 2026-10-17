# QuickNotes System Core REST API Specifications

## Endpoints

### 1. List User Notes
- Method: GET
- Path: /api/v1/notes
- Description: Retrieves a paginated list of notes owned by the authenticated requester profile.
- Success Status Code: 200 OK

### 2. Get Single Note
- Method: GET
- Path: /api/v1/notes/:id
- Description: Obtains comprehensive attribute properties for an isolated individual note record by ID lookup.
- Success Status Code: 200 OK

### 3. Create Note Entry
- Method: POST
- Path: /api/v1/notes
- Description: Initializes and saves a brand new note context instance directly inside the user profile collection records.
- Success Status Code: 201 Created

### 4. Update Note Content
- Method: PUT
- Path: /api/v1/notes/:id
- Description: Modifies specific title or body content variables on an active note database component registry row.
- Success Status Code: 200 OK

### 5. Remove Note Record
- Method: DELETE
- Path: /api/v1/notes/:id
- Description: Cleanly erases an active targeted note row instance entry permanently out of active record storage indexes.
- Success Status Code: 200 OK

### 6. Filter Notes by Tag
- Method: GET
- Path: /api/v1/notes/search
- Description: Queries the user collection to find note entities associated with a specific tag string parameter value.
- Success Status Code: 200 OK

## JSON Representation Structural Examples

### Creating a Note (POST /api/v1/notes)

#### Request Body Payload Format
```json
{
  "title": "Weekly Engineering Sync",
  "body": "Discuss migration details regarding system databases.",
  "tagIds": [1, 4, 7]
}
```

#### Response Body Return Format
```json
{
  "id": 4092,
  "title": "Weekly Engineering Sync",
  "body": "Discuss migration details regarding system databases.",
  "userId": 102,
  "createdAt": "2026-10-17T22:06:00Z",
  "updatedAt": "2026-10-17T22:06:00Z"
}
```

### Listing Notes (GET /api/v1/notes)

#### Response Body Return Format
```json
[
  {
    "id": 4092,
    "title": "Weekly Engineering Sync",
    "body": "Discuss migration details regarding system databases.",
    "userId": 102,
    "createdAt": "2026-10-17T22:06:00Z"
  },
  {
    "id": 3981,
    "title": "Grocery Shopping List",
    "body": "Remember to buy items before weekend lockdown.",
    "userId": 102,
    "createdAt": "2026-10-15T09:12:00Z"
  }
]
```

## Error Status Code Specifications

- 400 Bad Request
  - Reason Condition: Client fails required formatting parameters, such as presenting a title attribute stretching beyond 100 structural length bounds.
- 401 Unauthorized
  - Reason Condition: Missing or invalid authentication token passed inside the client transmission call headers array.
- 403 Forbidden
  - Reason Condition: The authenticated profile attempts access operations targeting a resource record owned exclusively by a different user entity account.
- 404 Not Found
  - Reason Condition: The specific individual note parameter lookup target ID value points to a non-existent index data slot.
- 500 Internal Server Error
  - Reason Condition: An unexpected transactional fault occurs within structural framework execution processes or storage connection layers.

### Error Response Body Example
```json
{
  "error": "Resource Not Found",
  "message": "The note with ID 88392 could not be found in our database system.",
  "statusCode": 404,
  "timestamp": "2026-10-17T22:06:05Z"
}
```
