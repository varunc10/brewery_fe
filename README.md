# Brewery Viewer Frontend

Welcome to the Brewery Frontend repository! This project is a web application that allows users to search for breweries and view their details.

## Table of Contents

  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Login](#login)
    - [Register](#register)
    - [Home](#home)
    - [BreweryInfo](#breweryInfo)
  - [Authentication](#authentication)
  - [Features](#features)
  - [Deployment](#deployment)


## Technologies Used

- React.js
- Ant Design for UI components
- axios for handling HTTP requests

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js and npm installed on your development machine.

### Installation

To get started with this frontend application, follow these steps: git clone https://github.com/varunc10/brewery_fe

Change to the project directory: cd brewery_fe

Install the project dependencies: npm install


## Usage

### Login

To access the login page, navigate to /login. Here, you can log in with your existing account by providing your username and password. Upon successful login, you will be redirected to the file upload page.

### Register

To access the register page, navigate to /register. Here, you can create a new account by providing a unique username and a secure password. After registering, you can log in using your newly created account.

### Home

Users can search for breweries by city, name, or type. The component fetches data from a remote API and displays it in a table. It provides a personalized greeting, search options, and loading indicators for a user-friendly experience. Clicking on a brewery name leads to a details page.

### BreweryInfo

displays detailed information about a specific brewery, along with user reviews. Users can view details such as the brewery's name, address, city, state, postal code, country, phone number, website, and brewery type. They can also see reviews left by other users, including their username, rating, and description.

Users have the option to add their own reviews, providing a rating on a scale of 1 to 5 and writing a description. The component offers a user-friendly interface for submitting reviews, allowing them to adjust the rating with a range input and enter their review in a textarea.

The component provides a "Home" button to navigate back to the main page and a "Submit Review" button to finalize the review submission.

## Authentication

This frontend app uses a secure authentication method, ensuring the privacy and security of your account. It communicates with the backend service for user authentication, and users can create new accounts or log in with existing ones.

## Features

- Search for breweries by city, name, or type.
- View brewery details, including name, address, phone number, website, and more.
- Leave reviews for breweries with a rating and description.

## Deployment

Hosted the frontend codebase on Vercel.
