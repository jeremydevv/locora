# Locora
FBLA 2026 Coding & Programming

Website + Electron.js Desktop Application + Serverless REST API Backend
 
**Full Tech Stack:**
*Auth & Data:* Firebase Cloudflare D1
*Site:* React TailwindCSS Cloudflare Pages and DNS
*Application:* Electron-Forge React Vite
*Distributio:* Site + Cloudflare R2 (CDN)

# Monorepo Outlined Structure

# apps/app
 This is the electron application that is autobuilt via 'Github Actions'. This is an app that uses web-tech to serve as a desktop application. This application also makes use of our apps/api to interact with data such as business' data, etc.
 Tooling:
  - electron-forge
  - react + vite
  - github actions
  - apps/api

# Folder Structure:
 locora/
  electron/
    main.ts:
    This houses the logic that interacts with the desktop app that interactions with the OS to display windows, etc. It also stores credentials via keytar to allow auto-logins for the desktop application.
   preload.ts:
    This has code that is preloaded into the other enviorment of our desktop application and provides an api to interact with the main.ts enviorment.
    
  public/
   This contains static assets that the application can use.
  
  src/
   This contains our web-tech application that is created from the index.html.
   This contains things such as our components and other parts of the project to ensure that everything works.
   
   components/
    This contains files that are all .tsx. This uses reacts functional components and also makes use of properties to create pieces of html that can be rendered and hydrate to data provided to them.
   data/
    This contains folders of functions that act as helper functions to interact with our api and fetch data.
   pages/
    These are all react components that act as pages that can be switched in our home page.

# apps/site
 This is the website that uses a 'React' + 'Vite' and has a home page, a download page, a waitlist page. The site is automatically deployed to Cloudflare Pages via 'Github Actions'
 Interactions occur within this with apps/api.
  - API requests for waitlists
  - Downloads the application via our CDN (Content Delievery Network)
 Tooling:
  - react + vite
  - cloudflare pages
  - github actions
  - apps/api

# Folder Structure:
  locora/
    src/
      assets/
        This contains static assets, mostly images or SVGs created into react components to use in the site.
      components/
        This contains many react components that can be used throughout the website.
      pages/
        This has react components to act as our pages to serve to the user and keep things more organized.
      data/
        Similar to the folder in our application, this uses abstraction to interaction with our API.   
    index.html/
      This is our main page, when using react and vite, you do a method which is called single page architecture. One page is used and is changed to serve the current purpose. This affects SEO, performance, and other aspects of the UX.
     types.ts/
       This contains some interfaces/types used in the project as it is a typescript based project.

# apps/api
 This is our backend that makes use of cloudflare workers to act as our serverless endpoint to match demand when needed instead of a 24/7 running backend. API requests hit "api.locora.org" to request and post data. This part of our project makes use of bindings which are injected into our env to interact with D1, KV, etc.
  Tooling:
   - cloudflare workers
   - github actions
   - cloudflare cdn (S3 Compatible Blob Storage)
  Cloudflare Services:
   - Cloudflare Workers
   - Cloudflare D1 (Sqlite)
   - Cloudflare KV (Deprecated / No longer in use in this project)
   - Cloudflare R2 (S3 Blob Storage)
  External Services:
   - Firebase (Storage for user data)

# Folder Structure:
  src/
    routes/
      utils/
        This has many files to help with returning common responses such as 404, 200, etc.
      v1/
        This follows a versioned API structure in case of public use or use from other people.
        Every resource has a .ts file and a folder to handle everything. For example:
          users.ts and users/
            favorites/
            ratings/
            information/
  
  data/
    This contains files that are abstractions of interacting with the Firebase REST API aswell as our bindings with our D1 storage / SQL storage.

Usage License applies to this entire project. 
