# Using APIs with Express

In this lab, we're going to combo the use of 2 APIs. First, we'll have the user enter a location (a landmark or an address) into a form. We'll take that information and translate it into GPS coordinates, or latitude-longitude. Finally, we'll give those coordinates to [DarkSky](https://darksky.net/dev/account) to see what the current weather is.

## Getting started

#### 1. FORK IT! CLONE IT!

You won't need to turn in this assignment, but you should fork and clone this repository for its starter code.

#### 2. Run `npm install`. 

This will install the dependecies you need to run an Express app from the `package.json` file.

#### 3. Create a file called `.env` at the root level. 

You can do this by running the command `touch .env`.

#### 4. Take a peek at the starter code

You've got a basic Node/Express app going on here. Take a look at it and get familiar with what it does. Make sure you can run the server and get to the home page.

## Your Starter Code

#### Views and EJS Layouts

Your layout is already set up and includes a reference to [Material CSS](https://materializecss.com/) by Google. It already has a basic navbar and two ejs files, but the rest is up to you! 

#### Routes

You've got two routes set up. One is a get route that is rendering your home page and the other is a post route that will eventually display the weather results that your user is searching for.

| Method | Path | Purpose |
| ---- | ------ | -------------------------- |
| GET | / | Show form where user can enter a location |
| POST | / | Take users search, get results, and display them |

#### Static Folder and CSS

You've got a static folder you can put static files into. There is already a `style.css` file for custom styles. What folder is your static folder is decided by the following line in `index.js`:

```
app.use(express.static('static'));
```

However, in this case, `static` is just the name of the folder. It could be anything, but since we're in the habit of making descriptive and meaningful names, `static` is a solid choice. You may also commonly see this folder called `public`, which is also a solid choice.

## Your Job!

1. Create a form on the home page for the user to enter a location

This will include a text input, and a submit button. You're going to use this to submit the location the user enters to your backend post route. 

> Make sure you have the method listed as "POST" on your form tag.

2. Test your form!

If your form is hooked up right, two things should be happening. First, you should be getting to the post route in your `index.js` file. You can tell this is happening if you're rendering the `results.ejs` view. Second, you should be getting the location from your form to the backend route. To test this, add the following line of code to the post route:

```
console.log(req.body);
```
