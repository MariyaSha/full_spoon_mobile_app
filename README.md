# Full Spoon Mobile App

Full Spoon is a **full-stack, recipe-based mobile shopping cart application** designed to turn recipe browsing into a practical meal-planning and grocery workflow.

Unlike a standard recipe app, Full Spoon helps users not only decide **what to cook**, but also **what ingredients to buy, how much to buy, and which selected recipes those ingredients belong to**.

The main feature of the app is a **smart shopping cart** that automatically combines ingredient quantities across multiple selected recipes into a single organized checklist.

For example, if two recipes require milk and flour, the app calculates the total quantity needed and presents it as a clean shopping list.

The application is being developed as an **Android-first full-stack mobile app**, with plans for APK installation and future persistent storage for saved carts and user workflows.

## Core Features

* Browse recipes by main categories
* Filter recipes by dietary preferences and additional tags
* View recipe details such as:

  * ingredients
  * instructions
  * calories
  * rating
  * review count
  * servings
* Save recipes to a **Loved Recipes** list
* Add recipes directly to a **Smart Cart**
* Automatically aggregate ingredient quantities across recipes
* Save carts for reuse on holidays, game nights, events and everyday shopping

## Repository Structure

### `README.md`

Project overview, app purpose, and repository structure.

### `food_dataset_project.ipynb`

The original data science notebook used to prepare the recipe dataset.

This notebook performs:

* dataset loading
* cleaning
* filtering
* image validation
* feature engineering
* tag normalization
* dietary flags
* export preparation

This is the notebook that serves as the starting point for transforming a data science project into a real product.

### `data/reviews_processed.parquet`

Processed and cleaned recipe dataset.

This file contains the curated recipe data used as the structured source for the mobile application.

### `data/reviews.parquet`

The raw Food.com dataset from Kaggle on which the project was based on.
<br>
Downloaded from: https://www.kaggle.com/datasets/irkaal/foodcom-recipes-and-reviews

### `wireframe/`

Application wireframes and screen flow diagrams.

This folder contains the visual blueprint for the app - defining the UI layout and feature roadmap for the mobile app.

## Project Goal

This project demonstrates how a traditional data science workflow can evolve into a **full-stack consumer-facing software product**.

The goal is to transform a notebook-based data project into a mobile application that regular users can install and use in everyday life.
