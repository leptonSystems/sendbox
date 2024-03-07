-- Creating the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    CONSTRAINT unique_user_id UNIQUE (id),
    INDEX idx_id (id),
    INDEX idx_email (email) 
);

-- Creating the contacts table
CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(22) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    CONSTRAINT unique_contact_id UNIQUE (contact_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id), 
    INDEX idx_phone_number (phone_number) 
);

-- Updating time zones in both users and contacts tables
UPDATE users
SET 
    created_at = created_at AT TIME ZONE 'OriginalTimeZone' AT TIME ZONE 'NewTimeZone',
    updated_at = updated_at AT TIME ZONE 'OriginalTimeZone' AT TIME ZONE 'NewTimeZone';

UPDATE contacts
SET 
    created_at = created_at AT TIME ZONE 'OriginalTimeZone' AT TIME ZONE 'NewTimeZone',
    updated_at = updated_at AT TIME ZONE 'OriginalTimeZone' AT TIME ZONE 'NewTimeZone';
