# 1. Baisc

## 1.2 Request

Work with request and send response;
```js
const server = http.createServer((req, res) => {
  console.log(req.url, rq.method, req.headers);

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>.....');
  res.write('xxx');
  res.end();
})
```

The following article provides a great overview of [available headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) and their role: 


# 2. Next JS

## 2.1 Basic Intro

Create: `npx create-next-app@latest first-next-app`

NextJS Works with React Server Components, Rendered only on the server, Never on the client.

### 2.1.1 Adding new page

In nextJs, add new path by adding new folder. NextJS relies on reserved, special filenames, but the filenames only matter inside the "app" folder.
- **page.js** => Define page content; Create a new page (e.g., app/about/page.js creates a `<your-domain>`/about page)
- layout.js => Define wrapper around pages; should be used with page. there must be one layout on the top; layout is used to wrap page.
- not-found.js => Define "Not found" fallback page
- error.js => Define Error fallback page
- loading.js => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
- route.js => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)
- icon.png => If you add a file named icon, it will be used directly as a favicon(website page icon)

### 2.1.2 Route Related

1. For common route: just create folder with page.js

2. For dynamic route:
Create [xxxcontent] under the folder, and create a page under [xxx];

### 2.1.3 use client

When using some client side feature, on server component, you need to add `'use client';` on the top of the file.

### 2.1.4 NotFound Page

Using notFound page directly

```js
import { notFound } from 'next/navigation';

if (!meal) {
    notFound();
}
```


## 2.2 Data Processing

### 2.2.1 Use light database: better-sqlite3

`npm install better-sqlite3`

```sql
const sql = require('better-sqlite3');
const db = sql('meals.db');

const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: '/images/burger.jpg',
    summary:
      'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    creator: 'John Doe',
    creator_email: 'johndoe@example.com',
  },
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();

```

### 2.2.2 Fetch data

1. Getting data directly from lite db:
```js
// lib side:
import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all(); // select all from meals; multiple row by all(), single row by get();
}

// Page Side:
const meals = await getMeals();
```

### 2.2.3 Suspense

```js
import { Suspense } from 'react';

<Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
    <Meals />
</Suspense>
```

### 2.2.4 triger cache - revalidatePath

## 2.3 Store Resources in Production

### 2.3.1 Storing Uploaded Images In The Cloud (AWS S3)
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/41737286#overview

### 2.3.2 Adding dynamic metadata - generateMetadata()


## 2.4 Page router ? App Router(introduce above)

### 2.4.1 Router

**Basic router**
The router here, is still the folder  name. inside the folder, the name should called index.js. at the outside level, the entrance is also an index.js.

if we add a js file under a folder beside the index.js. the file name will be the path under the next level path.

**Dynamic router**
[xxx].js tell nextJs it is a dynamic page;

## 2.5 Pre Render

### 2.5.1 Static Generation (SSG)

`getStaticProps()` -- can fetch data here, always need return object here;

```js
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.yym9yir.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // re evaluate the change if some changes come, and refresh data
  };
}
```

### 2.5.2 Server Side generation (SSR)

This will run on server, never on client;
```js
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API

  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  };
}
```

## 2.6 API Route

API routes will only run on server; 

```js
import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // data from incoming request

    const client = await MongoClient.connect(
      'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.yym9yir.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
```

## 2.7 Deploy NextJS Project - Vercel

Vercel - the same team who develop nextJS

Log with github and deploy by github repository



# 3 mongoDB

Create a new cluster

Network Access: add your local IP (can set access from anywhere)

Database Access: add at least one user

Cluster: