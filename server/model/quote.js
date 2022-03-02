const e = require('express');
const db = require('../util/database');

module.exports = class Quote {
  constructor(character, quote, showTitle) {
    this.character = character;
    this.quote = quote;
    this.showTitle = showTitle;
  }

  save() {
    const queryString = `INSERT INTO quote(
      character_name, content, media_title
      )VALUES($1, $2, $3);`;
    db.query(
      queryString,
      [this.character, this.quote, this.showTitle],
      (err, result) => {
        console.log(err);
        return result;
      }
    );
  }

  static async count() {
    try {
      const countQuery = await db.query(`SELECT COUNT(*) FROM quote;`);
      const size = countQuery.rows[0].count;
      return size;
    } catch (error) {
      console.log(error);
    }
  }

  static async getById(id) {
    try {
      const quote = await db.query(
        `SELECT character_name,content
        FROM quote
        WHERE id=$1;`,
        [id]
      );
      return quote;
    } catch (error) {
      console.log(error);
    }
  }

  static async getRandom(author) {
    let queryResult;
    try {
      if (!author) {
        queryResult = await db.query(
          `SELECT * FROM quote
          ORDER BY RANDOM()
          LIMIT 1;`
        );
      } else {
        db.queryString;
        queryResult = await db.query(
          `SELECT * FROM quote
          WHERE character_name = $1
          ORDER BY RANDOM()
          LIMIT 1;`,
          [author]
        );
      }
    } catch (error) {
      console.log(error);
    }
    return queryResult;
  }
};
