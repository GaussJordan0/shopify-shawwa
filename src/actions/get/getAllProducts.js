"use server";

import { Shopify } from "../../backend/shopify";

export async function getAllProducts() {
  let allProducts = [];
  const query = `#graphql
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
              }
            }                    
          }
            
        }
          
      }

      shop {
      paymentSettings {
      currencyCode
      enabledPresentmentCurrencies
      }
      }

      localization {   
        country {
                currency {
                name
                isoCode
                symbol
            }    
        }   
      }
    }
    
  `;

  const data = await Shopify(query);

  const products = data.data.products.edges; 
  allProducts = allProducts.concat(
    products.map((edge) => {
      const product = edge.node;

      const image = product.images.edges[0]?.node;
      const price = product.priceRange.maxVariantPrice.amount;
      const currency = data.data.shop.paymentSettings.currencyCode;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price,
        image: image
          ? {
              src: image.url,
              width: image.width,
              height: image.height,
              altText: image.altText,
            }
          : null,
        currency,
      };
    })
  );

  return allProducts;
}
