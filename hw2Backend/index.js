
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup'

const todoItem = object({ // json data validation
    content: string().required(),
    userId: string().required(),
    done: boolean().default(()=> false),
    category: string().default(),
    createdOn: date().default(() => new Date()),
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {item: todoItem})

// bind to serverless runtime
export default app.init();
