import db from "../config/db"

export const getItems = () => {
    return new Promise((resolve, reject) => {
        db.transaction(fx => {
            fx.executeSql('SELECT * FROM items', [],
                (fx, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const item = res.rows.item(i);
                            results.push({ id: item.id, name: item.name });
                        }
                    }
                    resolve({ success: true, data: results });
                })
        })
    })
}