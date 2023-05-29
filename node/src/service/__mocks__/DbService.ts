export const dbQuery = async (queryObj) => {
    if (queryObj.text.includes('SELECT')) {
        return {rows: [{name: 'test_name', password: '$2b$10$NyNGN9SPXXZRhhWroY8TmeUYVq7EE0uXipNAsBq0R/1EIgI46vZ.S'}]}
    }
}
