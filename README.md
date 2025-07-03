 SheNation - Digital Empowerment Platform (Frontend part)
 

SheNation is a web-based platform designed to empower women in Burundi by providing mentorship, skills development, and job opportunities. This project uses Next.js 15, TailwindCSS, and Redux Toolkit to create a futuristic, modern, and highly interactive user experience.


 Features

Dashboard: Personalized user experience with mentorship, courses, job postings, and progress tracking.

Mentorship System: Seamless mentor-mentee interaction with session booking, messaging, and feedback.


Courses: Structured learning paths with progress tracking and certification.


Job Board: Searchable job listings with filters and application management.


Community Forum: Secure space for discussions, expert Q&A, and networking.


Real-time Notifications: Live alerts for mentorship updates, job postings, and course activities.



Light Mode UI: Futuristic design with sleek animations and modern components.



 Tech Stack

Framework: Next.js

UI Styling: TailwindCSS

State Management:  Redux Toolkit

Animations:  Framer Motion / Tailwind Transitions


Routing: Next.js App Router


Mock Data: JSON-based static content for testing


 Installation & Setup

1 Clone the Repository

git clone https://github.com/FoibeU/MissionCapstone.git

cd she-nation

npm install --legacy-peer-deps

npm run dev



Here are some screens




Home page : 


<img width="940" alt="image" src="https://github.com/user-attachments/assets/bd0a967a-5893-41df-9f63-ba6611ae9af4" />






Dashboard  page: 


<img width="926" alt="image" src="https://github.com/user-attachments/assets/1cd088c8-d127-4e7b-b243-02be8887f5a5" />



Sign in page :



<img width="929" alt="image" src="https://github.com/user-attachments/assets/49d2ba4d-0959-4946-8e19-4242deb0702e" />


sign up page :


<img width="944" alt="image" src="https://github.com/user-attachments/assets/ca76ccf3-b490-4128-b49d-2ca913ccd1e8" />







 SheNation - Digital Empowerment Platform (Backend  part)



The backend of SheNation powers the core functionalities of the platform, including user authentication, mentorship logic, course handling, job management, and secure APIs. Built with Django, this backend is fully Dockerized, RESTful, and ready for scalable deployment.


Features

Authentication & Authorization: Secure user registration, login, and role-based access.

Mentorship APIs: Manage mentors, mentees, session bookings, feedback, and messaging.

Course Management: APIs for listing, enrolling in, and tracking courses.

Job Listings: Manage job postings, applications, and filters.

Community API: Endpoints for forum discussions, replies, and topic management.

Notifications System: API-driven event updates to be consumed by the frontend.

RESTful API Testing: Collection tested and documented using Postman.


Tech Stack

Backend Framework: Django 4+

API Framework: Django REST Framework (DRF)

Database: PostgreSQL

Containerization: Docker + Docker Compose

Testing & Docs: Postman Collection

Environment Management: python-dotenv

Deployment Ready: Gunicorn + Nginx supported structure




  1. Installation & Setup


git clone https://github.com/FoibeU/MissionCapstone.git

cd shenations

2. Set up the Environment Variables

Create a .env file in the root directory and add:

env

DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=she_nation
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=db
DB_PORT=5432


3. Build & Run with Docker


docker-compose up --build


The API will be running at:

 http://localhost:8082/api/
 
 
The Links 

Here is a link for Figma designs:  https://www.figma.com/design/ybIX0R4HeyggLmziUjPN38/SheNation-UI-Design?node-id=6-32&t=ol0eYzQxuz8e82H8-0 


Link for SheNation demo: https://youtu.be/3iZfMeWKVG4


Link to User Interface: https://shenation.vercel.app/ 

GitHub link:  https://github.com/FoibeU/MissionCapstone.git




For the deployment of SheNation, I will use Hostinger, because it  provides an affordable, reliable, and beginner-friendly hosting environment that fits the needs of my 


project. Hostinger provides the right  to host both the frontend and backend of the platform in one place, with a custom domain and secure access.

Its flexibility, support for modern web technologies, and strong uptime make it a suitable choice for a platform aiming to empower Burundian women by providing continuous


access to mentorship, digital tools, and learning resources, and I also did some research and found that it is the cheapest one.





