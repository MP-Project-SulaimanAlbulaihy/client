# Master-Piece-frontend
"Borrow something", a website for borrowing things where the user can publish his items and reserve items to borrow,
and this website should be based on his location as he can only borrow if he is a neighbor to the poster and much more..


## Trello: 
[https://trello.com/b/1qm6ACeN/master-piece-project](https://trello.com/b/1qm6ACeN/master-piece-project)


## User Story
 ##### As a "User" of "Borrow Something Website":
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

##### As "admin" of "Borrow Something Website": 
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
| `/explore`             | Explore            | public      | Shows all auctions                                             |
| `/explore/:id`         | Auction               | public      | See an auction description, and also you can bid               |
| `/users/:id`           | Profile            | public      | See a user profile, with all of his auctions                |
| `/signup`              | Signup             | public      | Signup form, navigate to login after signup                 |
| `/login`               | Login              | public      | Login form, navigate to home after login                   |
| `/addItem`             | createAuction            | user only   | Create a new auction                                        |
| `/EditItem`            | EditAuction           | user only   | Edit an auction                                             |
| `/dashboard`           | Dashboard          | user only   | Shows all of the user info                                  |
| `/dashboard/myAccount` | DashboardMyAccount | user only   | Shows all of the user info, and he/she can edit any info    |
| `/dashboard/myItems`   | DashboardMyAuctions   | user only   | Shows all of the user auctions, and he/she can edit any auction   |
| `/dashboard/myBids`    | DashboardMyBids    | user only   | Shows all of the user bids                                  |
| `/dashboard/watchList`    | DashboardWatchList    | user only   | Shows the user watch list                                  |
| `/dashboard/items`     | DashboardAuctions     | admin only  | Shows all auctions in site                                  |
| `/dashboard/users`     | DashboardUsers     | admin only  | Shows all users in site                                  |
| `/dashboard/reports`   | DashboardReports   | admin only  | Shows reports in the site, and admin can change their status |
| `/verify_account/id`   | VerifyTheAccount   | user only   | A page enables the user to activate their account           |
| `/verify_from_email`   | VerifyFromEmail    | user only   | A wlecome page to a user after register                     |
| `/reset_password/id`   | ResetPassword      | user only   | A page to let a user change his password                    |

## Components

- Home
- Explore
- Auction
- Profile
- Login
- Signup
- CreateAuction
- EditAuction
- Dashboard
- DashboardMyAccount
- DashboardMyAuctions
- DashboardWatchList
- DashboardMyBids
- DashboardAuctions
- DashboardUsers
- DashboardReports
- VerifyTheAccount
- VerifyFromEmail
- ResetPassword
