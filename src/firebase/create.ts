
import { ref, set, child, get } from "firebase/database";
import moment from "moment";

import database from '../utils/firebase';

type writeUser = {
    name: string,
    email: string,
    password: string
}

type readUser = {
    username: string,
    password: string
}

async function writeUserData({ name, email, password }: writeUser) {
    const db = database;
    await set(ref(db, 'users/' + Number(moment())), {
        username: name,
        password: password,
        email: email,
    });
}


function readUserData({ username, password }: readUser) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        get(child(dbRef, `users`)).then((snapshot) => {
            if (snapshot.exists()) {
                let list = snapshot.val();
                let user = Object.keys(list).map((key) => {
                    return {
                        id: key,
                        ...list[key]
                    }
                })

                let findUser = user.filter((item) => item.username === username && item.password === password);

                if(findUser.length === 0) {
                    resolve(undefined)
                }

                resolve(findUser);
            } else {
                console.log("No data available");
                resolve(undefined);
            }
        }).catch((error) => {
            console.error(error);
            resolve(undefined);
        });
    })

}

export {
    writeUserData,
    readUserData
}