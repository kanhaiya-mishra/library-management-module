# library-management-module

## Getting Started

### 1. Prequisites and cloning the repository

Please install Node.js for Node package manager (npm) and Git version control software 

```bash
# Clone the Repo
clone the repository by git clone https://github.com/kanhaiya-mishra/library-management-module.git

# Change directory
move to library-management-module folder by cd library-management-module
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

This is a simple Library/Book management module. It is built using HTML/CSS/Javascript, ReactJS and Redux.<br />
The app uses Webpack as build tool and browswer's Localstorage to persist book data.<br />
All pages opening based on route are React class components. These are under src/views folder<br />
All other react components are functional components and are under src/components<br />

### The Search page/feature

The search page contains a form that user can fill and click search to look up books. The search results are displyed on the same page.<br />
The search keywords/params are appended in URL after clicking search and then results are displayed. The Search form is filled using the URL search string when user refreshes the page.<br />
There are 2 operators - AND and OR<br />
The AND operator makes sure that a book contains ALL the search keywords given by user.<br />
The OR operator returns books containing any of the search keyword given by user.<br />


