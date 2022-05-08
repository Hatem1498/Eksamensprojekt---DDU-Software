const { Pool } = require("pg");
const { database } = require("pg/lib/defaults");

// PostgreSQL "pool" to talk to database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = {

insert: async function database(temp, hum){
        // Check value in query string
        
        console.log("data function called");

        // Prepare query for database
        const query = {
            text: "INSERT INTO climate (temp, hum) VALUES ($1, $2)",
            values: [temp, hum],
        };
        try{
        // Wait for database connection
        const client = await pool.connect();
        
        client
            // Send query to database
            .query(query)

            // Handle results 
            .then(() => {
            
            })

            // Handle errors
            .catch((err) => {
                console.error(err);
            })


            // Close connection
            .finally(() => {client.release()
            });
        }
        catch(err){
            console.log(err);
        }

    },

fetch: async function fetchData(){
        
        const query = "SELECT * FROM climate";
        try{
            const client = await pool.connect();

            client
                .query(query)
            
                .then((result) => {
                    /* console.log(JSON.stringify(result.rows)); */
                    module.exports.climate = JSON.stringify(result.rows);
                })
                // Handle errors
            .catch((err) => {
                console.error(err);
            })


            // Close connection
            .finally(() => {client.release()
                
            });
            
        }
        catch(err){
            console.log(err);
        }    
    },

    insertShelf: async function shelf(name, cheese){
        
        // Prepare query for database
        const query = {
            text: "INSERT INTO shelfs (shelf, cheese) VALUES ($1, $2)",
            values: [name, cheese],
        };
        try{
        // Wait for database connection
        const client = await pool.connect();
        
        client
            // Send query to database
            .query(query)

            // Handle results 
            .then(() => {
            
            })

            // Handle errors
            .catch((err) => {
                console.error(err);
            })


            // Close connection
            .finally(() => {client.release()
            });
        }
        catch(err){
            console.log(err);
        }

    },
    
    fetch_2: async function fetchShelf(){
        const query = "SELECT * FROM shelfs";
        try{
            const client = await pool.connect();

            client
                .query(query)
            
                .then((result) => {
                    module.exports.shelfs = JSON.stringify(result.rows);
                })
                // Handle errors
            .catch((err) => {
                console.error(err);
            })


            // Close connection
            .finally(() => {client.release()
                
            });
            
        }
        catch(err){
            console.log(err);
        }    
    }

};

