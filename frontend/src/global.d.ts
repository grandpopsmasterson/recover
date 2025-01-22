// Declare global types and modules in one file
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      DATABASE_URL: string;
      // Add other environment variables here
    }
  }

  // Declare CSS Modules
  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
}

// Ensure the file is treated as a module by adding an empty export statement.
export {};

  