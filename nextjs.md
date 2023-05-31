## Your first Next.js site

Like we used `wagtail start`, Next.js also has a project scaffolding command: `create-next-app`. We'll use this to create a new project:

```bash
npx create-next-app@latest --typescript --eslint --tailwind --use-npm frontend
cd frontend
```

For all prompts, you may use the default: `src/` No, App Router Yes, custom import alias No. We create our Next.js site under `frontend`, so Wagtail and Next.js are clearly separated.

All subsequent commands for the Next.js site will be within `frontend`.

```bash
# Run the development server
npm run dev
```

# Next.js workshops

Jamstack FTW!

A short series of workshops and take-home exercises for Next.js beginners who already know JavaScript and React.

## #1 Next.js 101, 14/12/2021 & 15/12/2021

Recording 15/12 -- recommended for people catching up: [20211215 Next.js 101 UK PM session.mp4](https://drive.google.com/file/d/1rv-RGQ9FewGv7xD_e3kfiEcdsLiuLxhy/view?usp=sharing)

Recording 14/12 -- for reference: [20211214 Next.js 101 UK AM session.mp4](https://drive.google.com/file/d/15sW_OUgXFGtoJmoaRI1Xl5JaGp3kxHSO/view?usp=sharing)

### Housekeeping

- 60min, grab a drink, turn off Slack
- Make sure you have Node 16 and npm v7 installed on your computer ahead of time, or any recent Node/npm version
- node --version
- npm --version
- Prerequisite: familiarity with React & JavaScript
- Solution to copy-paste from: <https://git.torchbox.com/thibaudcolas/llamanext>

### Agenda

- 15min, Next.js fundamentals presentation
- 3min, JAMstack
- 2min, Headless content or commerce
- 2min, React
- 2min, Supported rendering models
- 2min, routing
- 3min, hosting / Vercel
- 15min, basic project setup with create-next-app
- 2min, Install create-next-app
- 5min, Bootstrap a project
- 3min, npm run dev
- 5min, Basic project structure
- 5min, styles
- 5min, pages
- Making a new page
- 15min, dynamic routing
- Look around folder structure
- Get the site up and running (`npm run dev`)
- Inspect site markup
- Edit homepage
- \_app and \_document
- CSS modules
- Image optimisations
- Make a new page
- Link & routing
- `getStaticProps`

## #2 Next.js headless builds

### Housekeeping

- Make sure you have Node 16 and npm v7 installed on your computer
- Prerequisite: TBC
- Prerequisite: you've seen React code before

### Agenda

- 10min, Next.js headless CMS builds presentation
- Headless CMS examples
- Wagtail headless
- GraphQL
- 10min, basic project setup with create-next-app (or resume from first workshop)
- 5min, static data fetching with static routes
- 5min, static data fetching with dynamic routes
- 15min, dynamic data fetching and dynamic routes

### Copy-pasting

- <https://git.torchbox.com/thibaudcolas/llamanext>
- git reset --hard HEAD^1
- nvm use 16 # or 12 or 14 or 17
- <https://bakerydemo-thibaudcolas5.herokuapp.com/api/graphiql/>
- <https://bakerydemo-thibaudcolas5.herokuapp.com/api/graphql/>
- npm install @apollo/client graphql --save
- <https://github.com/thibaudcolas/bakerydemo/commit/c39421c98bb5da183e9c8f728611d7d89bc162f9>

### Questions

Wagtail routing with catch-all route: real-world example

### 2.1 Take-home exercise

Dynamic request-response rendering with [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)