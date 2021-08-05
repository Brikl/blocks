const trimQuery = (query: string) => query.replace(/\ /, "").replace(/\n/, " ")

export const GET_PRODUCTS = trimQuery(`
    query GET_PRODUCTS($first: Int!, $after: String!) {
        products(first: $first, after: $after) {
            totalCount
            edges {
                cursor
                node {
                    id
                    slugs {
                        url
                        langCode
                    }
                    title
                    description
                    media {
                        id
                        type
                        source
                        alt
                        isThumbnail
                    }
                    attributes {
                        id
                        title
                        description
                        isFeatured
                        source
                    }
                    variants {
                        id
                        title
                        type
                        options {
                            id
                            detail
                        }
                    }
                    createdAt
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }        
    }
`)

export const GET_PRODUCT_BY_ID = trimQuery(`
    query GetProductById($id: ID!) {
        product(id: $id) {
            id
            slugs {
                url
                langCode
            }
            title
            description
            media {
                id
                type
                source
                alt
                isThumbnail
            }
            attributes {
                id
                title
                description
                isFeatured
                source
            }
            variants {
                id
                title
                type
                options {
                    id
                    detail
                }
            }
            createdAt
        }
    }
`)
