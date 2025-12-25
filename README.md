Realty Data Aggregation & Filtering Platform

A full-stack real estate data platform that scrapes property listings from multiple real estate websites, normalizes the data into a unified structure, and provides an advanced filtering system using React for easy property discovery.

This project focuses on solving the problem of fragmented and inconsistent real estate data across platforms.


Features:

Web Scraping:

Scrapes real estate listings from multiple property websites

Handles both static and dynamic content

Extracts key property attributes like price, area, location, and configuration


Data Normalization:

Converts unstructured scraped data into a standardized JSON format


Normalized fields such as:

minPrice, maxPrice, avgPrice

pricePerSqft

areaSqft

location

propertyType

sourceWebsite


Backend Filtering API:

Stores structured data in a database (MySQL)

Supports multi-parameter filtering:

Budget range

Area range

Location

Property type

Optimized queries for faster filtering

 
 React Frontend:

Interactive UI built with React

Dynamic filters with real-time updates

Clean property cards for easy comparison

User-friendly and responsive design


Tech Stack:
Frontend

React.js

JavaScript (ES6+)

CSS / Tailwind (if applicable)

Backend

Node.js

Express.js

REST APIs

Scraping

Puppeteer (for dynamic pages)

Cheerio / Axios (for static pages)


Database:
MySQLs and renders filtered results


Data Flow:

Scrape property listings from real estate websites

Normalize raw data into a unified schema

Store cleaned data in MySQL

Backend exposes filtering APIs

React frontend consumes APIs and renders filtered results
