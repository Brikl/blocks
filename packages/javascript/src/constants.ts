const trimQuery = (query: string) => query.replace(/\ /, "").replace(/\n/, " ")

export const GET_PRODUCTS = trimQuery(`
    query GET_PRODUCTS($first: Int!, $after: Int!) {
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
                    }
                    variants {
                        id
                        title
                        type
                        options {
                            id
                        }
                        color {
                            id
                            title
                            hex
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
            }
            variants {
                id
                title
                type
                options {
                    id
                }
                color {
                    id
                    title
                    hex
                }
            }
            createdAt
        }
    }
`)
