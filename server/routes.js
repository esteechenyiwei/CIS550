const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

const getTop20Authors = (req, res) => {
  const q = `with aids as (
    select ag.author_id
    from author_has_genre ag left join genres g on ag.genre_id = g.genre_id
    where g.genre_name like '%science%fiction%'  
    )
    select a.author_name
    from authors a join aids on a.author_id = aids.author_id
    order by ave_rating desc
    limit 20
    `;
  connection.query(q, (error, results, field) => {
    if (error) {
      console.log('Q1a error in querying dtabase: ' + error);
      throw error;
      
    };
    res.json(results);
  });

};



module.exports = {
	getTop20Authors: getTop20Authors,

};