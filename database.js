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
                if(tabel == "climate"){
                    this.transfer();
                }
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
    
    update: async function update(info, sensor){
        
        let query = `UPDATE sensors SET info = '${info}' WHERE sensor = '${sensor}'`
        console.log(query);
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
        transfer: async function transfer(){
            
            const client = await pool.connect();
        
            client
                // Send query to database
                .query("SELECT * FROM climate")
        
                // Handle results
                .then((result) => {
                    let n_result = result.rows;
                    //Get first object row
                    const first = n_result.filter(obj=>{
                        return obj.id === 1
                    })
                    //Get last object row
                    const last = n_result.filter(obj=>{
                        return obj.id === n_result[n_result.length-1].id 
                    })
                    //Create two date objects
                    let start = new Date(first[0].date_time);
                    let end = new Date(last[0].date_time);
                    //Time difference between start and end date (/60000) to go from ms to minutes
                    let elapsed = (end.getTime()-start.getTime())/60000;
                    //If elapsed time is greater than 60 minutes, all data from climate TABLE is backed up to History TABLE and climate table is reset
                    if(elapsed > 5){
                        console.log("Time elapsed");
                    const query = {
                        text: "INSERT INTO History (data) VALUES ($1)",
                        values: [JSON.stringify(n_result)],
                    };
                    client.query(query);
                    console.log("Data transfer complete");
                    client.query("TRUNCATE TABLE climate RESTART IDENTITY");
                    console.log("climate Restarted");
                    }
                })
        
                // Handle errors
                .catch((err) => {
                    console.error(err);
                })
        
                // Close connection
                .finally(() => client.release());
            
        },
};

