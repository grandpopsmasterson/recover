CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
  username VARCHAR(20),
  email VARCHAR(30),
  salt VARCHAR,
  password VARCHAR,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  available BOOLEAN NOT NULL DEFAULT true,
  user_type VARCHAR(20),
  profile_image_url VARCHAR(50),
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_name VARCHAR(20) NOT NULL,
    client_name VARCHAR(30),
    client_email VARCHAR(30),
    client_phone INT,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    loss_date TIMESTAMP,
    street_address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(20),
    zipcode CHAR(20),
    carrier VARCHAR(20),
    project_stage VARCHAR(20),
    project_type VARCHAR(20),
);

CREATE TABLE IF NOT EXISTS floors (
    id BIGSERIAL PRIMARY KEY,
    floor_level INT,
    floor_name VARCHAR(20),
    project_id BIGINT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS rooms (
    id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    floor_id BIGINT NOT NULL,  -- Keep BIGINT for foreign key
    room_name VARCHAR(255) NOT NULL,
    room_length DECIMAL(10, 2),
    room_width DECIMAL(10, 2),
    room_area DECIMAL(10, 2),
    dmg_length DECIMAL(10, 2),
    dmg_width DECIMAL(10, 2),
    dmg_area DECIMAL(10, 2),
    dmg_percentage DECIMAL(10, 2),
    damaged BOOLEAN NOT NULL DEFAULT false,
    class_rating VARCHAR(20),
    FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXITS notifications (
    id SERIAL PRIMARY KEY,
    sender_id INT, -- Optional if system-triggered notifications
    receiver_id INT NOT NULL, -- The user who will receive the notification
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    project_role VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_losses (
    id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    room_id BIGINT NOT NULL,
    loss_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

