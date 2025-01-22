CREATE TABLE IF NOT EXISTS users (
  user_id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
  username VARCHAR(20),
  salt VARCHAR,
  password VARCHAR,
  first_name VARCHAR(20),
  last_name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS projects (
    project_id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_name VARCHAR(255) NOT NULL,
    home_owner VARCHAR(255),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state CHAR(20),
    zipcode CHAR(20),
    carrier VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rooms (
    room_id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_id BIGINT NOT NULL,  -- Keep BIGINT for foreign key
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
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE
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
    role_id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role_name VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_losses (
    loss_id BIGSERIAL PRIMARY KEY,  -- Use BIGSERIAL instead of SERIAL
    project_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    loss_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE
);

