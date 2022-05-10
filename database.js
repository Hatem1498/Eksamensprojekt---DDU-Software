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

insert: async function database(value_1, value_2, tabel){
        
    let query;
        if(tabel == "climate"){
         query = {
            text: "INSERT INTO climate (temp, hum) VALUES ($1, $2)",
            values: [value_1, value_2],
        };
    }
    if(tabel == "shelfs"){
         query = {
            text: "INSERT INTO shelfs (shelf, cheese) VALUES ($1, $2)",
            values: [value_1, value_2],
        };
    }
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

fetch: async function fetchData(tabel){
    let query;
    if(tabel == "climate"){
        query = "SELECT * FROM climate";
    }
    if(tabel == "shelfs"){
        query = "SELECT * FROM shelfs";
    }
        try{
            const client = await pool.connect();

            client
                .query(query)
            
                .then((result) => {
                    module.exports.results = JSON.stringify(result.rows);
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
    
};

