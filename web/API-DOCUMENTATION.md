# Change and Leadership API Documentation

## Report API

The Report API allows you to retrieve user assessment results in JSON format using a report ID.

### Endpoint

```
GET /api/report/{id}
```

### Authentication

The API requires authentication using a Bearer token in all environments:

```
Authorization: Bearer YOUR_API_KEY
```

The API key is defined in the .env file as `API_KEY`.

### URL Parameters

| Parameter | Description |
|-----------|-------------|
| `id`      | The report ID. This is the same ID that users receive after completing the assessment. |

### Query Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `lang`    | string | No       | Language code for the report (e.g., 'en'). If not provided, the report's original language will be used. |

### Response

#### Success Response (200 OK)

```json
{
  "id": "58a70606a835c400c8b38e84",
  "timestamp": 1677676645123,
  "language": "en",
  "results": [
    {
      "domain": "C",
      "title": "Strategic Leadership - Driving Change",
      "description": "Strategic Leadership - Driving Change measures your ability to articulate vision, inspire others, and drive organizational transformation.",
      "score": 4.2,
      "result": "high",
      "text": "Change-Oriented Leader articulates an inspiring vision and direction...",
      "facets": [
        {
          "title": "Vision",
          "score": 4.5,
          "result": "high",
          "text": "Leaders with a high score in the \"vision\" scale can communicate a clear..."
        },
        {
          "title": "Inspiring Others",
          "score": 3.9,
          "result": "high",
          "text": "Leaders with a high score in the \"inspiring others\" scale communicate..."
        }
      ]
    },
    // Additional domains...
  ]
}
```

#### Error Responses

**400 Bad Request**

```json
{
  "error": "Invalid report ID format"
}
```

**401 Unauthorized**

```json
{
  "error": "Unauthorized"
}
```

**404 Not Found**

```json
{
  "error": "Report not found"
}
```

**500 Internal Server Error**

```json
{
  "error": "Failed to retrieve report"
}
```

### Example Usage

#### cURL

```bash
# With authentication
curl "http://localhost:3000/api/report/58a70606a835c400c8b38e84" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"

# In production
curl "https://yourdomain.com/api/report/58a70606a835c400c8b38e84" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"

# With language parameter
curl "https://yourdomain.com/api/report/58a70606a835c400c8b38e84?lang=en" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### JavaScript (Fetch)

```javascript
// Example using fetch API
async function getReport(reportId, apiKey, language = null) {
  const url = new URL(`https://yourdomain.com/api/report/${reportId}`);
  
  if (language) {
    url.searchParams.append('lang', language);
  }
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}
```

### Notes

- The Report ID must be a valid MongoDB ObjectId (24 hexadecimal characters).
- For domain 'A' (Technology Adoption Attitude), the API will exclude score and result fields at the domain level, as per the application's current behavior.
- The API response format matches the JSON export functionality available in the web application.