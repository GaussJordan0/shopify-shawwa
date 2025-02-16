export async function Shopify(query, variables = {}) {
    try {
        const data = await fetch(`https://${process.env.shopify_domain}.myshopify.com/api/2025-01/graphql.json`, {
            method: "POST",
            headers: {
                "X-Shopify-Storefront-Access-Token": process.env.shopify_access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query, variables})
        })
        const dataObject = await data.json();

        if(!data.ok) {
            
            console.error("API ERROR__", dataObject)
        }

        console.log(dataObject)
        return dataObject
    } catch (error) {
        console.error(error)
    }
}