# Northfield Library — Book Finder

A lightweight web app for a school library. Students, teachers, and readers can instantly search the catalogue to see which books are available, what genre they belong to, and whether they are currently on the shelf.

## Stack
- **HTML/CSS/JavaScript** — No build step, no frameworks, no terminal required. 
- **Hosting:** Netlify
- **Storage:** Local JavaScript array (no backend required).

## Features
- **Search Bar:** Instantly filters books by title or author.
- **Filters:** Click genre chips to filter by category, or toggle "Available only" to hide borrowed books.
- **Pagination:** Shows 10 books per page, with page numbers and Next/Prev arrows. (Resets to page 1 automatically when you type or change a filter).
- **Navigation:** Fully functional in-page tabs for "Catalogue", "New Arrivals", and "Opening Hours".
- **Reliability:** 100% generated CSS covers. No external images that can break or fail to load.

## Tools Used
- **ChatGPT / Deepseek:** Used for scaffolding the project structure, writing the filter/pagination logic, and generating the fictional book data. I reviewed all generated code, adjusted the CSS layout, and can explain exactly how the pagination and filter states work.

## Data Note
All 24 books, authors, and school details are fictional sample data created for this demo. Cover art is generated dynamically using CSS based on the book's genre and ID.
