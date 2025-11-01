# Cocktail Rest API

This is simple rest api project for managing cocktails and ingredients

## Cocktails 🍸

### 🟢 GET `/cocktails/:id`
Returns cocktail by id.
The response includes all basic cocktail data along with its **list of ingredients and their measures**.

### 🟢 GET `/cocktails`
Returns cocktails based on specified queries

- **`alcoholic`** — *(boolean)*  
  Filters cocktails based on whether they contain alcohol.
    - `true` → returns only alcoholic cocktails
    - `false` → returns only non-alcoholic cocktails

- **`hasIngredient`** — *(number)*  
  Returns only cocktails that contain the ingredient with the given `id`.  
  Example: `hasIngredient=5` → returns cocktails that include ingredient with ID = 5.

- **`category`** — *(string)*  
  Filters cocktails by category name (e.g., `"Ordinary Drink"`, `"Cocktail"`, `"Shot"`).

- **`sort`** — *(string)*  
  Defines which field to sort results by.  
  Available values:
    - `name` → sort by cocktail name
    - `createdAt` → sort by creation date
    - `updatedAt` → sort by last update date

- **`order`** — *(string)*  
  Sets the sorting direction.
    - `asc` → ascending order 
    - `desc` → descending order 
  
### 🟡 POST `/cocktails`
Creates a new cocktail and saves it to the database.  
Before adding a cocktail, make sure that **all required ingredients already exist** in the ingredients database — each cocktail can only reference ingredients that are stored beforehand.

#### Example request body
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

## Ingredients 🍋‍