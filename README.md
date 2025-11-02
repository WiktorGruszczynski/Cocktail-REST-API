# Cocktail REST API


This project provides a fully functional **REST API** for managing **cocktails** and their **ingredients**.  
It allows users to create, read, update, and delete both cocktails and ingredients.

---

### 🌍 Base URL
All endpoints are prefixed with: `/api/v1`

## Cocktails 🍸

### 🟢 GET `/cocktails/:id`
Returns cocktail by id.
The response includes all basic cocktail data along with its **list of ingredients and their measures**.

#### 🧾 Example response

```json
{
  "id": 7,
  "name": "JagerBomb",
  "category": "Shots",
  "tags": ["Jagermeister", "Energy Drink"],
  "instructions": "Pour the Jägermeister into a shot glass. Fill a highball glass with Red Bull. Drop the shot into the Red Bull and drink immediately.",
  "imageUrl": "https://cocktails.solvro.pl/images/cocktails/jagerbomb.png",
  "alcoholic": true,
  "createdAt": "2025-11-01T17:36:18.646Z",
  "updatedAt": "2025-11-01T18:20:29.466Z",
  "ingredients": [
    {
      "id": 11,
      "name": "Jägermeister",
      "description": "Jägermeister is a German herbal liqueur made with 56 different herbs, fruits, roots, and spices.",
      "alcohol": true,
      "type": "Liqueur",
      "percentage": 35,
      "imageUrl": "https://cocktails.solvro.pl/images/ingredients/jagermeister.png",
      "createdAt": "2025-11-01T17:03:42.395Z",
      "updatedAt": "2025-11-01T17:03:42.395Z",
      "measure": "50 ml"
    },
    {
      "id": 12,
      "name": "Red Bull",
      "description": "An energy drink known for its caffeine content, commonly mixed with alcoholic beverages.",
      "alcohol": false,
      "type": "Mixer",
      "percentage": null,
      "imageUrl": "https://cocktails.solvro.pl/images/ingredients/redbull.png",
      "createdAt": "2025-11-01T17:05:10.395Z",
      "updatedAt": "2025-11-01T17:05:10.395Z",
      "measure": "120 ml"
    }
  ]
}

```

### 🟢 GET `/cocktails`
Returns a **list of cocktails** with optional filters and sorting options.

#### 🔍 Query Parameters:
- **alcoholic** – filters cocktails by whether they contain alcohol (`true` for alcoholic, `false` for non-alcoholic).
- **hasIngredient** – filters cocktails that include a specific ingredient (by ingredient ID).
- **category** – filters cocktails by category (e.g. `"Classic"`, `"Modern"`, `"Signature"`).
- **sort** – specifies the field to sort by (`name`, `createdAt`, or `updatedAt`).
- **order** – defines sorting order (`asc` for ascending, `desc` for descending).

#### 🧾 Example HTTP request
```http request
GET /cocktails?alcoholic=true&hasIngredient=5&category=Classic&sort=updatedAt&order=desc
```

  
### 🟡 POST `/cocktails`
Creates a new cocktail and saves it to the database.  
Before adding a cocktail, make sure that **all required ingredients already exist** in the ingredients database — each cocktail can only reference ingredients that are stored beforehand.

#### 🧾 Example request body
```json
{
  "name": "Alaska Cocktail",
  "category": "Ordinary Drink",
  "glass": "Cocktail glass",
  "tags": ["Beach", "Chilli"],
  "instructions": "Stir all ingredients with ice, strain into a cocktail glass. Drop in a twist of lemon and serve.",
  "imageUrl": "https://cocktails.solvro.pl/images/ingredients/alaska-cocktail.png",
  "alcoholic": true,
  "ingredients": [
    { "id": 2, "measure": "1 1/2 oz" },
    { "id": 67, "measure": "2 dashes" },
    { "id": 532, "measure": "3/4 oz" }
  ]
}
```

### 🟡 POST `/cocktails/:cocktail_id/ingredients`
Adds an **existing ingredient** to an **existing cocktail**, along with its corresponding measure.  
Both the cocktail and the ingredient must already exist in the database before making this request.



### 🔵 PUT `/cocktails/:id`
Updates an **existing cocktail** with the provided data.  
The request body may include **any subset of cocktail fields** — only the specified properties will be updated, while the others will remain unchanged.

#### 🧾 Example Request Body
```json
{
  "name": "Smoky Negroni",
  "instructions": "Stir all ingredients with ice and strain into a rocks glass over a large ice cube.",
  "tags": ["Classic", "Bitter", "Smoky"]
}
```

### 🔵 PUT `/cocktails/:cocktail_id/ingredients/:ingredient_id`
Updates a **specific ingredient** within a cocktail — currently supports updating the **measure** (amount) of that ingredient.

#### 🧾 Example Request Body
```json
{
  "measure": "2 oz"
}
```

### 🔴 DELETE `/cocktails/all`
Removes **all cocktails** from the database.  
⚠️ Use with caution — this action is irreversible.


### 🔴 DELETE `/cocktails/:id`
Deletes a **specific cocktail** identified by its `id`.

### 🔴 DELETE `/cocktails/:cocktail_id/ingredients/:ingredient_id`
Removes a **specific ingredient** from a cocktail.  
Both the `cocktail_id` and `ingredient_id` must be provided.



## Ingredients 🍋‍

### 🟢 GET `/ingredients/:id`
Returns a **single ingredient** based on its ID.

#### 🧾 Example response

```json
{
  "id": 7,
  "name": "Gin",
  "type": "Spirit",
  "alcohol": true,
  "percentage": 40,
  "description": "A clear alcoholic beverage made by distilling fermented grain and flavoring it with juniper berries.",
  "imageUrl": "https://example.com/gin.jpg",
  "createdAt": "2025-10-15T12:44:30.000Z",
  "updatedAt": "2025-10-20T10:21:15.000Z"
}
```

### 🟢 GET `/ingredients`
Returns a **list of ingredients** with optional filtering and sorting parameters.

#### 🔍 Query Parameters:
- **alcohol** – filters ingredients by alcohol content (`true` for alcoholic, `false` for non-alcoholic).
- **type** – filters ingredients by type (e.g. `"Spirit"`, `"Juice"`, `"Syrup"`).
- **sort** – specifies the field to sort by (`name`, `createdAt`, or `updatedAt`).
- **order** – defines sorting order (`asc` for ascending, `desc` for descending).

### 🟡 POST `/ingredients`
Adds a **new ingredient** to the database.

Use this endpoint to create a new ingredient that can later be used when defining cocktails.  


### 🔵 PUT `/ingredients/:id`
Updates an **existing ingredient** in the database.

You can update one or multiple fields — the request body doesn’t have to include all properties.

### 🔴 DELETE `/ingredients/all`
Deletes **all ingredients** from the database.

### 🔴 DELETE `/ingredients/:id`
Deletes a **single ingredient** from the database by its ID.

When an ingredient is deleted, it is also **automatically removed from all cocktails** that contain it.