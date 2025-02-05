# Recover

#Recover systems main application has 2 parts (front end & back end). The front end  is a Next.js/React based application residing in `/frontend`. The backend is written in Java with Spring Boot. It resides in `/spring-backend`.

## Starting the processes
### Front end

#### Installing Dependencies/Node.js runtime.
You will need to download Node.js. I am running version 20.

To run the front end, `cd` in the `/frontend` directory. Then, run the following commands:
- `npm install`
- `npm run dev`

This will start the server and you will be able to access the frontend locally on `localhost:3000`.

To create a production build, run `npm run build`.

### Back end
#### Installing Dependencies
To run the back end, it's a little more complicated. Ensure you have the correct version of Java and Maven. Use `brew` for the simplest setup on Mac.

- `brew install openjdk@21`

You might need to symlink and modify your path in your user shell. To verify your installation, run the following command: `java -version`. You should see an output like this:
```
openjdk version "21.0.6" 2025-01-21
OpenJDK Runtime Environment Homebrew (build 21.0.6)
OpenJDK 64-Bit Server VM Homebrew (build 21.0.6, mixed mode, sharing)
```
Then, install maven
- `brew install maven`
To verify your installation, run this command: `mvn -version`. You should see an output like this:
```
Apache Maven 3.9.9 (8e8579a9e76f7d015ee5ec7bfcdc97d260186937)
Maven home: /usr/local/Cellar/maven/3.9.9/libexec
Java version: 21.0.6, vendor: Homebrew, runtime: /usr/local/Cellar/openjdk@21/21.0.6/libexec/openjdk.jdk/Contents/Home
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "13.7.3", arch: "x86_64", family: "mac"
```

#### Running the Java backend
- `cd /spring-backend`
- `mvn clean install`
- `mvn spring-boot:run`

You will encounter errors related to PostgreSQL.

### Database
#### Installation
We use PostgreSQL for our database. You will need to install PostgreSQL version 15. In your terminal, enter the following command: `brew install postgresql@15`

Verify your installation with this command: `brew info postgresql@15`. You may be given a command to follow. If you are using `zsh`, you will need to run this:
`export PATH="/usr/local/opt/postgresql@15/bin:$PATH" >> ~/.zshrc`. If you are using `bash`, it would look like this:
`export PATH="/usr/local/opt/postgresql@15/bin:$PATH" >> ~/.bashrc`

You will need to source your updated .rc file. Run the command `source ~/.bashrc` or `source/.zshrc`.

You can now run and stop your postgresql server with these commands:
```
brew services start postgresql@15
brew services stop postgresql@15
```

#### Creating a user
You will need a user to run your databases with. Run this following command:
`psql template0` to access the PSQL CLI. From here you will create a user for your postgres databases. In this CLI, enter the following commands:
```
CREATE USER $username WITH PASSWORD '$password';
ALTER USER $username WITH SUPERUSER;
```
Exit the CLI tool with `\q`. Now, re-enter psql with the user you created and create the database:
```
psql template0 -U $username
CREATE DATABASE $database_name;
```
Again, exit `psql` with the `\q` command.

Locate the `pom.xml` file in your application. It should have the parent directory of `/spring-backend`.

Find the line for `spring datasource.url`. Change the name of the db, which is the substring after the final `/`, to the $database_name you used above.
Next, change your `spring.datasource.username` to the $username that created your database. Change `spring.datasource.password` to your $password.

You should now be able to run the spring-boot application without errors.