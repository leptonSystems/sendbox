CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    CONSTRAINT unique_user_id UNIQUE (id),
    INDEX idx_email (email) 
);

CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    CONSTRAINT unique_contact_id UNIQUE (contact_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id), 
    INDEX idx_phone_number (phone_number) 
);
