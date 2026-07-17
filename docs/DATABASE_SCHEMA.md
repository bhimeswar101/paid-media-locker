# Database Schema

The application uses **PostgreSQL** with **Prisma ORM** for data storage.

---

# User

Stores user account information, wallet balance, and relationships with uploaded media, purchases, and wallet transactions.

| Field | Type |
|--------|------|
| id | String |
| name | String |
| email | String (Unique) |
| password | String |
| coins | Integer |
| createdAt | DateTime |

### Relationships

- One user can upload multiple media items.
- One user can purchase multiple media items.
- One user can have multiple wallet transactions.

---

# Media

Stores uploaded images and their unlock price.

| Field | Type |
|--------|------|
| id | String |
| title | String |
| image | String |
| preview | String |
| price | Integer |
| ownerId | String |
| createdAt | DateTime |

### Relationships

- Each media item belongs to one user.
- One media item can be purchased by multiple users.

---

# Purchase

Stores which user has unlocked which media.

| Field | Type |
|--------|------|
| id | String |
| userId | String |
| mediaId | String |
| createdAt | DateTime |

### Constraints

- One user can purchase the same media only once.
- Implemented using a composite unique constraint:

```
@@unique([userId, mediaId])
```

---

# Transaction

Stores wallet activity such as coin additions and media purchases.

| Field | Type |
|--------|------|
| id | String |
| userId | String |
| amount | Integer |
| type | String |
| description | String |
| createdAt | DateTime |

---

# Entity Relationships

```
User
 ├── Media (One-to-Many)
 ├── Purchase (One-to-Many)
 └── Transaction (One-to-Many)

Media
 └── Purchase (One-to-Many)

Purchase
 ├── User (Many-to-One)
 └── Media (Many-to-One)
```