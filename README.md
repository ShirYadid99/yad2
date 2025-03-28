[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KnqVbps7)
# README 
<h1>EX5</h1>
<h1>Eviatar Davidyan - Shir Yadid</h1>
<p>Email: eviaterda@edu.hac.ac.il</p>
<p>Email: shiryad@edu.hac.ac.il</p>

<h1>Yad2-like Website</h1>

<h2>Overview</h2>
<p>This project is a simple Yad2-like website where users can post new ads, view them, and an admin user can approve and edit ads. It is built using Node.js, Express.js, Sequelize ORM for database interaction, and EJS for server-side templating.</p>

<h2>Features</h2>
<ul>
    <li><strong>Landing Page:</strong> Displays all approved ads, most recent first. Includes links to the admin area and to post a new ad. Features a search form to filter ads by title.</li>
    <li><strong>Post New Ad Page:</strong> Allows users to post new ads. Displays confirmation message upon successful submission. Ad will be visible after admin approval.</li>
    <li><strong>Login Page:</strong> Validates user credentials and redirects to admin page if valid. Shows error message if credentials are incorrect.</li>
    <li><strong>Admin Page:</strong> Available only for admin user. Displays all ads in the database and allows admin to approve or delete ads. Implemented as a single-page application using REST API endpoints.</li>
</ul>

<h2>Models</h2>
<ul>
    <li><strong>Ad:</strong> Contains title, description, price, phone number, email, insertion date, and modification date.</li>
    <li><strong>User:</strong> Includes login and password fields.</li>
</ul>


<h2>Technologies Used</h2>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>Sequelize</li>
    <li>EJS</li>
    <li>Bootstrap</li>
</ul>

<h2>Folder Structure</h2>
<ul>
    <li>config</li>
    <li>controllers</li>
    <li>models</li>
    <li>public</li>
    <li>routes</li>
    <li>views</li>
</ul>
#   y a d 2 
 
 