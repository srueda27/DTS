function formatNumberToUSD(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

async function getProducts(id) {
  try {
    // Fetch the product's data from the API
    const response = await fetch(`https://fakestoreapi.com/products/${id ?? ''}`);
    let productResponse

    try {
      productResponse = await response.json();
    } catch (jsonParseError) {
      // Handle JSON parsing error (e.g., empty response body, no id found)
      throw new Error("Product not found")
    }

    // Add a condition to check if the function is getting an ID; if yes, return only the object related to that product
    if (id) {
      return {
        id: productResponse.id,
        price: formatNumberToUSD(productResponse.price),
        category: productResponse.category,
        rate: productResponse.rating.rate
      }
    } else {
      // Iterate through the product list to generate a new list using the map function.
      return productResponse.map((item) => {
        return {
          id: item.id,
          price: formatNumberToUSD(item.price),
          category: item.category,
          rate: item.rating.rate
        }
      }).filter((item) => parseFloat((item.price).replace("$", "")) < 50.0 && item.rate > 4); // Filter list by price lower than 50 and rate greater than 4
    }
  } catch (err) {
    if (err.message && err.message == 'Product not found') {
      console.log(err.message)
    } else {
      console.log(err)
    }
  }
}

// Example usage:
async function productUpdateList(id) {
  const products = await getProducts(id);
  // This console will execute only after the promise from `getProducts` is resolved
  console.log(products ?? "")
}

productUpdateList();
productUpdateList(1);
productUpdateList(333); // This id doesn't exist