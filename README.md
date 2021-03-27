# library-management-module

## Getting Started

### 1. Prequisites and cloning the repository
```bash

Please install the Node package manager (npm)
# Clone the Repo
clone the repository by git clone https://github.com/kanhaiya-mishra/library-management-module.git

# Change directory
move library-management-module by cd library-management-module
```

### 2. Install dependencies
```bash
# Install npm dependencies
npm install
```

### 3. Start the app
```bash
# Start the app
npm run start
```

## About

### The App

This is a simple Library/Book management module. It is built using HTML/CSS/Javascript, ReactJS and Redux.
The app uses Webpack as build tool and browswer's Localstorage to persist book data.
All pages opening based on route are React class components. These are under src/views folder
All other react components are functional components and are under src/components

### The Search page/feature

The search page contains a form that user can fill and click search to look up books. The search results are displyed on the same page.
The search keywords/params are appended in URL after clicking search and then results are displayed. The Search form is filled using the URL search string when user refreshes the page.
There are 2 operators - AND and OR
The AND operator makes sure that a book contains ALL the search keywords given by user.
The OR operator returns books containing any of the search keyword given by user.


