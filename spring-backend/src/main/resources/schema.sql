CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(20),                     -- Changed from CHAR to VARCHAR
    zipcode VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,  -- Added UNIQUE and NOT NULL
    email VARCHAR(50) NOT NULL UNIQUE,            -- Added length and NOT NULL
    password VARCHAR(255) NOT NULL,        -- Added length and NOT NULL
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    available BOOLEAN NOT NULL DEFAULT true,
    user_type VARCHAR(20) NOT NULL,        -- Added NOT NULL
    profile_image_url VARCHAR(255),
    company_id BIGINT, 
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE  
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,     -- Increased length
    client_name VARCHAR(30),
    client_email VARCHAR(50),              -- Increased length for emails
    client_phone VARCHAR(20),
    claim_number VARCHAR(20),              -- Changed to VARCHAR for phone numbers
    start_date TIMESTAMP,
    loss_date TIMESTAMP,
    received_date DATE DEFAULT CURRENT_DATE,
    cat_reference VARCHAR(20),
    policy_start TIMESTAMP,
    policy_expiration TIMESTAMP,
    year_built VARCHAR(4),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(20),                     -- Changed from CHAR to VARCHAR
    zipcode VARCHAR(20),                   -- Changed from CHAR to VARCHAR
    carrier VARCHAR(50),                   -- Increased length
    stage VARCHAR(20),
    project_type VARCHAR(20),
    loss_type VARCHAR(20),
    scope VARCHAR(20)              -- Removed trailing comma
);

CREATE TABLE IF NOT EXISTS flags (
    id BIGSERIAL PRIMARY KEY,
    status VARCHAR(20),           
    event VARCHAR(20),
    project_id BIGINT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS floors (
    id BIGSERIAL PRIMARY KEY,
    floor_level INT NOT NULL,              -- Added NOT NULL
    floor_name VARCHAR(20),
    project_id BIGINT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rooms (
    id BIGSERIAL PRIMARY KEY,
    floor_id BIGINT NOT NULL,
    room_name VARCHAR(255) NOT NULL,
    room_length DECIMAL(10, 2),
    room_width DECIMAL(10, 2),
    room_area DECIMAL(10, 2),
    dmg_length DECIMAL(10, 2),
    dmg_width DECIMAL(10, 2),
    dmg_area DECIMAL(10, 2),
    dmg_percentage DECIMAL(5, 2),          -- Reduced precision as it's a percentage
    damaged BOOLEAN NOT NULL DEFAULT false,
    class_rating VARCHAR(20),
    FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (  -- Fixed EXITS typo
    id BIGSERIAL PRIMARY KEY,              -- Changed to BIGSERIAL for consistency
    sender_id BIGINT,                      -- Changed to BIGINT for consistency
    receiver_id BIGINT NOT NULL,           -- Changed to BIGINT for consistency
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    project_role VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_losses (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    loss_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);


-- DROP TABLE IF EXISTS project_losses CASCADE;
-- DROP TABLE IF EXISTS companies CASCADE;
-- DROP TABLE IF EXISTS roles CASCADE;
-- DROP TABLE IF EXISTS notifications CASCADE;
-- DROP TABLE IF EXISTS rooms CASCADE;
-- DROP TABLE IF EXISTS flags CASCADE;
-- DROP TABLE IF EXISTS floors CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;