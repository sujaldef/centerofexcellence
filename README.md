# centerofexcellence

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)

## 📝 Description

The Center of Excellence (CoE) platform is a scalable, full-stack solution designed to streamline knowledge sharing and collaboration within an organization. Built with a modern tech stack including React, Tailwind CSS, Redux, FastAPI, and MongoDB, the platform offers a responsive and intuitive user experience. Role-based access control ensures that administrators and users have tailored dashboards and permissions. Key features include comprehensive event management, allowing for the creation and promotion of internal and external events; a blog publishing system for disseminating information and insights; real-time notifications to keep users informed of important updates; and robust, JWT-based OAuth2 authentication for secure access and data protection. This platform empowers organizations to centralize expertise, foster innovation, and drive continuous improvement.

## ✨ Features

- 🔐 Auth
- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## 📦 Key Dependencies

```
@fullcalendar/daygrid: ^6.1.17
@fullcalendar/interaction: ^6.1.17
@fullcalendar/react: ^6.1.17
@react-three/fiber: ^9.1.2
@reduxjs/toolkit: ^2.7.0
@tailwindcss/vite: ^4.1.4
aos: ^2.3.4
axios: ^1.9.0
axios-retry: ^4.5.0
dompurify: ^3.2.5
framer-motion: ^12.9.4
gsap: ^3.13.0
jsonwebtoken: ^9.0.2
jwt-decode: ^4.0.0
lucide-react: ^0.503.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`


## 📁 Project Structure

```
.
├── backend
│   ├── app
│   │   ├── config.py
│   │   ├── jwt_handler.py
│   │   ├── models
│   │   │   ├── auth_model.py
│   │   │   ├── blog_model.py
│   │   │   ├── event_model.py
│   │   │   ├── event_registration_model.py
│   │   │   ├── newsletter_model.py
│   │   │   ├── notification_model.py
│   │   │   └── user_model.py
│   │   ├── password.py
│   │   ├── routes
│   │   │   ├── routes_auth.py
│   │   │   ├── routes_blog.py
│   │   │   ├── routes_event.py
│   │   │   ├── routes_event_registration.py
│   │   │   ├── routes_newsletter.py
│   │   │   ├── routes_notifications.py
│   │   │   └── routes_user.py
│   │   └── services
│   │       ├── __init__.py
│   │       ├── auth_service.py
│   │       ├── blog_service.py
│   │       ├── event_registration_services.py
│   │       ├── event_service.py
│   │       ├── newsletter_services.py
│   │       ├── notification_services.py
│   │       └── user_service.py
│   ├── db.py
│   ├── main.py
│   ├── requirements.txt
│   └── uploads
│       ├── Screenshot 2025-02-01 153329.png
│       ├── Screenshot 2025-02-01 191453.png
│       ├── Screenshot 2025-02-01 205931.png
│       ├── Screenshot 2025-03-17 120427.png
│       ├── Screenshot 2025-04-07 192017.png
│       ├── Screenshot 2025-05-20 004549.png
│       ├── dp1.jpg
│       ├── dp8.jpg
│       ├── hero6.jpg
│       ├── hero8.png
│       ├── initiatives1.png
│       ├── initiatives2.png
│       └── initiatives3.png
├── eslint.config.js
├── index.html
├── package.json
├── public
│   ├── FRAME (4).png
│   ├── Medicaps.png
│   ├── aboutSec.png
│   ├── assets
│   │   ├── New folder
│   │   │   ├── ContactCard.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── EsteemedGuests.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventCarouselCard.jsx
│   │   │   ├── EventsAndTestimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── FAQItem.jsx
│   │   │   ├── FaqKpiContact.jsx
│   │   │   ├── Guestandnewsletter.jsx
│   │   │   ├── HeroContent.jsx
│   │   │   ├── Herosection.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── KpiAndEvents.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── MetricsSection.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── OngoingEvents.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── TopEvents.jsx
│   │   │   ├── UpcomingEvents.jsx
│   │   │   └── WhyChooseUs.jsx
│   │   ├── event img.json
│   │   ├── event1.jpg
│   │   ├── event2.jpg
│   │   ├── event3.jpg
│   │   ├── event4.jpg
│   │   ├── event5.jpg
│   │   ├── people1.jpg
│   │   ├── people2.jpg
│   │   ├── people3.jpg
│   │   ├── people4.jpg
│   │   └── prople5.jpg
│   ├── bgimage.eventdes.png
│   ├── blog1.png
│   ├── blog2.png
│   ├── blog3.png
│   ├── blog4.png
│   ├── dp1.jpg
│   ├── dp2.jpg
│   ├── dp3.jpg
│   ├── dp4.jpg
│   ├── dp5.jpg
│   ├── dp6.jpg
│   ├── dp7.jpg
│   ├── dp8.jpg
│   ├── event1.jpg
│   ├── event2.jpg
│   ├── eventsdata.json
│   ├── faq.jpg
│   ├── guest1.png
│   ├── guest2.png
│   ├── guest3.png
│   ├── hero1.jpg
│   ├── hero10.jpg
│   ├── hero2.jpg
│   ├── hero3.png
│   ├── hero4.jpg
│   ├── hero5.jpg
│   ├── hero6.jpg
│   ├── hero7.jpg
│   ├── hero8.png
│   ├── hero9.jpg
│   ├── highlights1.png
│   ├── highlights2.png
│   ├── highlights3.png
│   ├── highlights4.png
│   ├── impact1.png
│   ├── impact2.png
│   ├── impact3.jpg
│   ├── initiatives1.png
│   ├── initiatives2.png
│   ├── initiatives3.png
│   ├── initiatives4.png
│   ├── initiatives5.png
│   ├── landingbgimg.png
│   ├── logo.png
│   ├── mission.png
│   ├── mission.svg
│   ├── newsletter.jpg
│   ├── newsletter.png
│   ├── past1.png
│   ├── past2.png
│   ├── past3.png
│   ├── past4.png
│   ├── project1.png
│   ├── project2.jpg
│   ├── project3.png
│   ├── sage.png
│   ├── speaker1.png
│   ├── speaker2.png
│   ├── speaker3.png
│   ├── sponsors1.png
│   ├── sponsors2.png
│   ├── sponsors3.png
│   ├── timelineimg.1.png
│   ├── timelineimg.2.png
│   ├── timelineimg.3.png
│   ├── transform.jpg
│   ├── user.jpg
│   ├── user2.jpg
│   ├── user3.jpg
│   ├── vision.png
│   ├── vision.svg
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── Components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── SignUp.jsx
│   ├── assets
│   │   └── react.svg
│   ├── auth
│   │   └── AuthInitializer.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── About
│   │   │   ├── Components
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── MissionVision.jsx
│   │   │   │   └── OurTimeline.jsx
│   │   │   └── index.jsx
│   │   ├── Admin
│   │   │   ├── AdminDashboard
│   │   │   │   ├── Components
│   │   │   │   │   ├── ActionButtons.jsx
│   │   │   │   │   ├── EventCalendar.jsx
│   │   │   │   │   ├── EventCard.jsx
│   │   │   │   │   ├── EventSection.jsx
│   │   │   │   │   ├── Events.jsx
│   │   │   │   │   ├── SearchAndFilters.jsx
│   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   ├── StatsCard.jsx
│   │   │   │   │   └── calendar-custom.css
│   │   │   │   └── index.jsx
│   │   │   ├── AdminListEvent
│   │   │   │   ├── Components
│   │   │   │   │   ├── BasicInformation.jsx
│   │   │   │   │   ├── EventDescription.jsx
│   │   │   │   │   ├── EventMedia.jsx
│   │   │   │   │   ├── FAQ.jsx
│   │   │   │   │   ├── RegistrationInfo.jsx
│   │   │   │   │   ├── Schedule.jsx
│   │   │   │   │   ├── SpeakersOrganizers.jsx
│   │   │   │   │   └── SponsersAndOrganizers.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── AdminManageEvent
│   │   │   │   ├── Components
│   │   │   │   │   ├── ActionButton.jsx
│   │   │   │   │   ├── DeadlineModal.jsx
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   ├── NotificationModal.jsx
│   │   │   │   │   ├── ParticipantsSection.jsx
│   │   │   │   │   ├── StatCard.jsx
│   │   │   │   │   └── UpdatesSection.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── AdminNotification
│   │   │   │   ├── Components
│   │   │   │   │   ├── NotificationHeader.jsx
│   │   │   │   │   ├── QuestionList.jsx
│   │   │   │   │   └── SuggestionList.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── BlogDetails
│   │   │   │   ├── Components
│   │   │   │   │   ├── BlogDetails.jsx
│   │   │   │   │   └── BlogSection.jsx
│   │   │   │   └── Index.jsx
│   │   │   ├── BlogSection
│   │   │   │   ├── Components
│   │   │   │   │   ├── BlogCard.jsx
│   │   │   │   │   └── SmallBlogCard.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── EditBlog
│   │   │   │   └── index.jsx
│   │   │   ├── EventSection
│   │   │   │   ├── Components
│   │   │   │   │   ├── EventCard.jsx
│   │   │   │   │   ├── QuickActions.jsx
│   │   │   │   │   ├── SearchAndFilters.jsx
│   │   │   │   │   └── TopBar.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── NewBlog
│   │   │   │   └── index.jsx
│   │   │   └── index.jsx
│   │   ├── Contact
│   │   │   └── Index.jsx
│   │   ├── EventDetails
│   │   │   ├── Components
│   │   │   │   ├── EventCountdown.jsx
│   │   │   │   ├── EventDescription.jsx
│   │   │   │   ├── EventHighlights.jsx
│   │   │   │   ├── EventTimeline.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── PastEvents.jsx
│   │   │   │   └── Sponsors.jsx
│   │   │   └── index.jsx
│   │   ├── Landing
│   │   │   ├── Components
│   │   │   │   ├── BlogsAndTestimonials
│   │   │   │   │   ├── Components
│   │   │   │   │   │   ├── BlogCard.jsx
│   │   │   │   │   │   ├── BlogSection.jsx
│   │   │   │   │   │   ├── Newsletter.jsx
│   │   │   │   │   │   ├── TestimonialCard.jsx
│   │   │   │   │   │   └── Testimonials.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── CallToAction.jsx
│   │   │   │   ├── FaqOurPresence
│   │   │   │   │   ├── Components
│   │   │   │   │   │   ├── FAQ.jsx
│   │   │   │   │   │   ├── FAQItem.jsx
│   │   │   │   │   │   └── OurPresence.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── Herosection
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── ImpactWeCreate
│   │   │   │   │   ├── Components
│   │   │   │   │   │   └── ImpactWeCreate.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   └── InitiativesAndProjects
│   │   │   │       ├── Components
│   │   │   │       │   ├── CurrentInitiatives.jsx
│   │   │   │       │   └── ProjectsHighlights.jsx
│   │   │   │       └── index.jsx
│   │   │   └── index.jsx
│   │   ├── Login
│   │   │   └── index.jsx
│   │   ├── Projects
│   │   │   └── Index.jsx
│   │   ├── PublicBlogs
│   │   │   ├── BlogDetails
│   │   │   │   └── BlogDetails.jsx
│   │   │   ├── Components
│   │   │   │   ├── BlogFilters.jsx
│   │   │   │   ├── BlogRequestsList.jsx
│   │   │   │   └── UserBlogCard.jsx
│   │   │   └── index.jsx
│   │   └── Student
│   │       ├── Blogs
│   │       │   ├── Components
│   │       │   │   ├── BlogFilters.jsx
│   │       │   │   ├── BlogRequestsList.jsx
│   │       │   │   ├── StudentNewBlog.jsx
│   │       │   │   └── UserBlogCard.jsx
│   │       │   └── index.jsx
│   │       ├── Components
│   │       │   ├── EventCard.jsx
│   │       │   └── Sidebar.jsx
│   │       ├── CreateProfile
│   │       │   ├── Components
│   │       │   │   ├── ProfileForm.jsx
│   │       │   │   ├── ProfileImage.jsx
│   │       │   │   └── SkillsInterests.jsx
│   │       │   └── index.jsx
│   │       ├── EventRegistration
│   │       │   ├── Components
│   │       │   │   ├── EventDetails.jsx
│   │       │   │   ├── EventHighlights.jsx
│   │       │   │   ├── RegistrationForm.jsx
│   │       │   │   └── SkillCheckbox.jsx
│   │       │   └── index.jsx
│   │       ├── Events
│   │       │   ├── Components
│   │       │   │   ├── EventModal.jsx
│   │       │   │   ├── EventsPage.jsx
│   │       │   │   ├── NotificationDropdown.jsx
│   │       │   │   ├── SearchFilters.jsx
│   │       │   │   └── TabButtons.jsx
│   │       │   └── index.jsx
│   │       ├── StudentDashboard
│   │       │   ├── Components
│   │       │   │   ├── EventStats.jsx
│   │       │   │   ├── SkillsInterests.jsx
│   │       │   │   ├── UpcomingEvents.jsx
│   │       │   │   └── WelcomeSection.jsx
│   │       │   └── index.jsx
│   │       ├── StudentNewBlog
│   │       │   └── StudentNewBlog.jsx
│   │       └── index.jsx
│   ├── redux
│   │   ├── slices
│   │   │   ├── blogSlice.js
│   │   │   ├── eventSlice.js
│   │   │   ├── eventregistrationSlice.js
│   │   │   ├── newsletterSlice.js
│   │   │   ├── notificationSlice.js
│   │   │   └── userSlice.js
│   │   └── store.js
│   └── utils
│       └── decodeToken.jsx
└── vite.config.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)

