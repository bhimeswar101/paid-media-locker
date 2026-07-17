# API Documentation

## Base URL

```
http://localhost:5000
```

---

# Authentication

## Register User

| Method | Endpoint |
|---------|----------|
| POST | `/auth/register` |

### Description

Creates a new user account.

### Authentication

Not Required

---

## Login User

| Method | Endpoint |
|---------|----------|
| POST | `/auth/login` |

### Description

Authenticates the user and returns a JWT token.

### Authentication

Not Required

---

## Get Logged-in User

| Method | Endpoint |
|---------|----------|
| GET | `/auth/me` |

### Description

Returns the authenticated user's profile.

### Authentication

Required

---

# Media

## Upload Media

| Method | Endpoint |
|---------|----------|
| POST | `/media` |

### Description

Uploads a new media item with an unlock price.

### Authentication

Required

---

## Browse Media

| Method | Endpoint |
|---------|----------|
| GET | `/media` |

### Description

Returns all uploaded media along with preview, unlock price, and purchase status.

### Authentication

Not Required

---

## Media Details

| Method | Endpoint |
|---------|----------|
| GET | `/media/:id` |

### Description

Returns complete details of a single media item.

### Authentication

Not Required

---

# Purchases

## Unlock Media

| Method | Endpoint |
|---------|----------|
| POST | `/purchase` |

### Description

Purchases and unlocks a media item using wallet coins.

### Authentication

Required

---

## My Purchases

| Method | Endpoint |
|---------|----------|
| GET | `/purchase` |

### Description

Returns all media purchased by the authenticated user.

### Authentication

Required

---

# Wallet

## Wallet Balance

| Method | Endpoint |
|---------|----------|
| GET | `/wallet` |

### Description

Returns the current wallet balance.

### Authentication

Required

---

## Add Coins

| Method | Endpoint |
|---------|----------|
| POST | `/wallet/add` |

### Description

Adds coins to the authenticated user's wallet.

### Authentication

Required

---

## Transaction History

| Method | Endpoint |
|---------|----------|
| GET | `/wallet/transactions` |

### Description

Returns all wallet transactions.

### Authentication

Required

---

# Download

## Download Purchased Media

| Method | Endpoint |
|---------|----------|
| POST | `/download` |

### Description

Allows users to download media they have already purchased.

### Authentication

Required