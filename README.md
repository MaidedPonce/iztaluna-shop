# iztaluna-shop

## Running the Project Locally

To run the project locally, follow these steps:

1. **Clone the Repository**:
   `git clone https://github.com/<your-username>/iztaluna.git`
2. **Use yarn to install the project dependencies**
   `yarn install`

3. **Create a .env.local file in the root of your project directory and add the following variable**
   `VITE_API_URL=<your-api-url>
`
4. **Run the following command to start the development server**
   `yarn dev`



## Deploying to GitHub Pages

This project is deployed automatically on GitHub Pages using GitHub Actions. Follow these steps to set up the deployment:

Configure Repository Secrets:

1. Navigate to your GitHub repository.
2. Go to Settings > Secrets and variables > Actions.
3. Add any necessary secrets, such as VITE_API_URL.
4. Automatic Deployment:

On every push to the gh-pages branch, the project will automatically build and deploy to GitHub Pages.

## Structure

- ui: Here we can find the components, containers and pages.
- config: This will contain our apis url
- services: Here you should add every request you need
- store: Here you will find our manage states which are auth, products and user
- lib: This directory will have constants

### Technologies used

- Vite and React
- Zustand
- Tank Stack / React Query
- Tailwind
