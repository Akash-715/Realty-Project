# Realty Data Aggregation & Filtering Platform

A **full-stack real estate data platform** that scrapes property listings from multiple real estate websites, normalizes fragmented data into a **unified structure**, and provides an **advanced filtering system** using React for seamless property discovery.

This project addresses the major problem of **inconsistent and scattered real estate data across different platforms** by aggregating, standardizing, and serving it through a single interface.

---

##  Key Features

### Web Scraping
- Scrapes property listings from **multiple real estate websites**
- Handles both **static and dynamic content**
- Extracts key attributes:
  - Price
  - Area
  - Location
  - Configuration
  - Property type

---

### Data Normalization
- Converts **unstructured scraped data** into a standardized JSON schema
- Ensures consistency across all data sources

#### Normalized Fields:
- `minPrice`
- `maxPrice`
- `avgPrice`
- `pricePerSqft`
- `areaSqft`
- `location`
- `propertyType`
- `sourceWebsite`

---

### Backend Filtering API
- Stores structured data in **MySQL**
- Exposes optimized **REST APIs**
- Supports **multi-parameter filtering**:
  - Budget range
  - Area range
  - Location
  - Property type
- Optimized SQL queries for **fast filtering performance**

---

### React Frontend
- Interactive UI built with **React**
- Dynamic filters with **real-time updates**
- Clean and readable **property cards**
- Fully **responsive and user-friendly** design

---

## Tech Stack

### Frontend
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="45" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="45" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="45" />
</p>

### Backend
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="45" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="45" />
</p>

### Web Scraping
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/puppeteer/puppeteer-original.svg" width="45" />
</p>

### Database
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" width="45" />
</p>

---

##  Data Flow Architecture

1. Scrape property listings from multiple real estate websites  
2. Normalize raw scraped data into a unified schema  
3. Store cleaned data in MySQL  
4. Backend exposes filtering APIs  
5. React frontend consumes APIs and renders filtered results  

---

## Project Highlights
- End-to-end **data pipeline** (Scraping → Normalization → Storage → API → UI)
- Designed for **scalability and extensibility**
- Clean separation of concerns between frontend, backend, and scraping layers

---

