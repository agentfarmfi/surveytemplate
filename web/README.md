# Orientation Profile Survey

A comprehensive personality and orientation assessment tool based on scientific research. This survey measures multiple dimensions of personality and work orientations:

- **Psychological Capital**: Self-efficacy, Optimism, and Resilience
- **Social Orientations**: Self-concern, Reciprocation, Other-orientation, and Creditor ideology
- **Work Goal Orientations**: Learning, Performance, and Avoidance orientations
- **Entrepreneurial Orientation**: Autonomy, Risk Taking, and Innovativeness
- **Cognitive Style**: Knowing, Planning, and Creating styles

## Technical Overview

The project is built with:
- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database for storing results
- [NextUI](https://nextui.org/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization

## Installation

Prerequisites:
- [Node.js](https://nodejs.org) (v16+)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Docker and Docker Compose](https://docs.docker.com/compose/install/) (for MongoDB)

## Setup

1. Clone the repository
2. Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_ENV=development
DB_URL=mongodb://root:example@localhost:27017
DB_NAME=survey
DB_COLLECTION=results
```

3. Install dependencies:

```bash
yarn
```

4. Start MongoDB:

```bash
docker-compose up -d
```

5. Run the development server:

```bash
yarn dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Customizing the Survey

To customize the survey questions and logic:

1. Edit `custom-questions.js` to modify or add questions
2. Update domain descriptions and scoring logic in `src/actions/index.ts`
3. Modify answer choices in `custom-choices.js` if needed

See `FULLINSTRUCTIONSFORQUESTIONSCHANGE.md` for detailed instructions on replacing survey questions.

## Generating Results

When users complete the survey:
- Results are saved to MongoDB
- Users can view results online
- Results can be downloaded as JSON
- Results can be printed to PDF

## Development Commands

```bash
# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint

# Format code
yarn format:fix
```

## License

Licensed under the [MIT license](../LICENSE).