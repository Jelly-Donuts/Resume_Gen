# Build a Resume

Build your own resume at https://buildaresume.herokuapp.com/

## Features
* Dead simple resume generator, simply enter your information and we will make you a beautiful PDF
* Font-size dynamically changes to ensure that all of your information fits on one page and doesn't go past the page
* Supports autofilling of basic information
* Simple UI / UX to easily add and remove fields from your resume and to add more of the same catagory (The add-remove code can be found at https://github.com/illiteratecoder/Add-Remove-Buttons.js if you want to add it to any of your own websites)


## Stack
* HTML / CSS - basic web
* JavaScript - front end interactivity
* MySQL - hosting the current pdf count
* Express.js - connecting everything
* Node.js - backend
* PDFKit - generating the actual PDFs
* NodeMailer - site updates
* Heroku - free server


## ToDo
* Export to different formats
* Persistant storage of generated resumes
* Autofill based on previously generated resumes from the site
* Expanding text boxes


## Sample Resume
![Sample Resume][sampleResume]

[sampleResume]: https://buildaresume.herokuapp.com/static/images/sampleResume.png "Sample Resume"