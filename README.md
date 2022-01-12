# Master-Piece-frontend
"Borrow something", a website for borrowing things where the user can publish his items and reserve items to borrow,
and this website should be based on his location as he can only borrow if he is a neighbor to the poster and much more..

➤ Deployment: https://jerani.herokuapp.com/  <br/>
➤ Local: http://localhost:3000 <br/>
➤ Slides: https://Slides  //Later on <br/>
➤ Backend: https://github.com/MP-Project-SulaimanAlbulaihy/server

## Trello: 
[https://trello.com/b/1qm6ACeN/master-piece-project](https://trello.com/b/1qm6ACeN/master-piece-project)


## User Story
 As a "User" of "Borrow Something Website":
 I want to borrow an item for a limited time for free,
 or lend/give something to other people for charity for a limited time, 
 to help others and gain good deeds especially with people of my area.
 So user can borrow items and save money where he doesn't need to buy item only for one use.
 Ensure that the user able to:
 - log in to "borrow something" or register if not a member and logout
 - navigate to other pages and different categories
 - able to select items and order a request to borrow something
 - able to post as many items he want with his contact details
 - see my profile and can edit profile
 - see hisory of items borrowed and pending items for borrowing and already in use.
 - see requestus if any of people want to borrow

As "admin" of "Borrow Something Website": 
I can see users and posts and messages of people, and block users if needed
or delete posts
 Ensure that the 'admin' able to:
 - log in to his account and logout
 - navigate to other pages and different categories
 - able to edit/delete all posts or users

## UML Diagram
![masterpiece UML Diagram frontend](https://i.ibb.co/Yf4t8mr/Untitled-Diagram-drawio-3.png)


## Router Routes

| Path                   | Component          | Permissions | Behavior                                                    |
| ---------------------- | ------------------ | ----------- | ----------------------------------------------------------- |
| `/`                    | Home               | public      | Home page, show all items and seach or choose category                  |
| `/post/:id`         | Post               | public      | see the item ans its details with pictures               |
| `/dashboard/:id`           | Dashboard            | user only      | See a user profile, with all of his reserved and pending and published items                |
| `/signup`              | Signup             | public      | Signup form to register for the website                 |
| `/login`               | Login              | public      | Login form, navigate to home after login                   |
| `/post`             | CreatePost            | user only   | Create a new item for others                                        |
| `/favourite`            | Favourite           | user only   | see user favourites and edit them                                             |
| `/post_edit`           | EditPost          | user only   | edit the post                                  |
| `/messages` | Messages | user only   | Shows all user messages and history    |
| `/forgot_password/id`   | ResetPassword   | user only   | A page enables the user to request his password if he forgot it           |
| `/verify_from_sms`   | VerifyFromSMS    | user only   | A wlecome page to a user after register                     |

## Components

- Home
- Item
- Login
- Signup
- CreatePost
- EditPost
- Dashboard
- ResetPassword
- Messages
- VerifyFromSMS
- Favourite
- Navbar
- Footer
- Notifications
- Post
- Comments

## Wireframe

![masterpiece Wireframe frontend](https://i.ibb.co/4KvgH4z/1.png)
![masterpiece Wireframe frontend](https://i.ibb.co/9bykPYQ/2.png)
![masterpiece Wireframe frontend](https://i.ibb.co/r6g0W3Q/3.png)
![masterpiece Wireframe frontend](https://i.ibb.co/R2d31yF/4.png)
![masterpiece Wireframe frontend](https://i.ibb.co/1G2x3sD/5.png)
![masterpiece Wireframe frontend](https://i.ibb.co/CPSWqLH/6.png)
![masterpiece Wireframe frontend](https://i.ibb.co/PcNjWcM/7.png)
