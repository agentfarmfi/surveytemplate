# Teamwork Approaches Survey

A comprehensive web-based assessment tool designed to help individuals and teams understand their collaborative working styles across six key dimensions of teamwork.

## About

The **Teamwork Approaches Survey** is developed by **AgentFarm, Osk** to provide insights into how people approach collaboration and teamwork in professional settings. This assessment evaluates six critical dimensions that influence team effectiveness and individual contribution to collaborative efforts.

## What It Measures

The survey assesses your approach to teamwork across six comprehensive dimensions:

### 📈 **Innovation and Change**
- **Vision**: Ability to communicate clear, compelling pictures of the future
- **Inspiring Others**: Capacity to motivate and energize teammates
- **Creative Approach**: Preference for experimentation and novel solutions
- **Driving Innovation**: Fostering innovative thinking and challenging conventional approaches

### 📚 **Learning and Development**
- **Pursuing Learning Opportunities**: Focus on skill development and growth challenges
- **Seeking Stakeholder Insight**: Engaging external perspectives for team improvement
- **Analyzing Challenges**: Systematic approach to understanding and solving problems
- **Coaching Others**: Supporting peers' growth and development

### 🎯 **Driving for Results**
- **Defining Roles**: Contributing to role clarity and shared expectations
- **Planning and Structuring**: Preference for organized, structured work approaches
- **Monitoring**: Attention to task execution and goal alignment
- **Pursuing Achievement**: Motivation to demonstrate competence and gain recognition
- **Providing Feedback**: Offering constructive input and guidance to others

### 🤝 **Building Team Spirit**
- **Building Trust**: Earning confidence through integrity and collective focus
- **Inclusive Decision-Making**: Encouraging shared input and collaborative problem-solving
- **Social Support**: Showing care for teammates' well-being and needs
- **Social Bonding**: Investing in personal relationships beyond work tasks

### 💙 **Prosocial Approach**
- **Other-Orientation**: Considering and prioritizing others' needs and interests
- **Self-Concern**: Balancing personal interests with collaborative goals

### 💻 **Technology Adoption Attitude**
- **Innovator (Pioneer)**: First to adopt emerging technologies and drive innovation
- **Visionary (Early Adopter)**: Strategic early adoption with thoughtful evaluation
- **Pragmatic (Early Majority)**: Careful evaluation before adopting proven technologies
- **Conservative (Late Majority)**: Preference for stability and widely-tested solutions
- **Skeptic (Laggard)**: Resistance to change and emphasis on risk awareness

## Features

- **78 carefully crafted questions** across six dimensions
- **24 distinct facets** providing detailed insights
- **Interactive results visualization** with personalized interpretations
- **Downloadable reports** in PDF and JSON formats
- **Team comparison tools** for understanding collaborative dynamics
- **Mobile-responsive design** for accessibility across devices
- **Privacy-focused** with secure data handling

## Getting Started

### Taking the Survey

1. Visit the survey website
2. Complete the 78-question assessment (approximately 10-15 minutes)
3. Receive your personalized results immediately
4. Save your unique ID to revisit results later
5. Share and compare with team members (optional)

### Understanding Your Results

Your results include:

- **Overall scores** for each of the six dimensions
- **Detailed facet breakdowns** showing specific strengths and preferences
- **Personalized interpretations** explaining what your scores mean
- **Visual charts** for easy understanding of your teamwork profile
- **Comparison capabilities** to understand team dynamics

## Technical Implementation

### Architecture

The Teamwork Approaches Survey is built using modern web technologies:

- **Frontend**: Next.js 14 with TypeScript
- **UI Framework**: NextUI with Tailwind CSS
- **Database**: MongoDB for result storage
- **Analytics**: Google Analytics integration
- **Deployment**: Vercel-ready configuration

### Key Files Structure

```
web/
├── custom-questions.js          # All 78 survey questions
├── custom-choices.js           # Response scales and scoring
├── src/
│   ├── actions/index.ts        # Scoring logic and domain definitions
│   ├── messages/en.js          # UI text and descriptions
│   ├── app/[locale]/
│   │   ├── test/               # Survey interface
│   │   ├── result/             # Results display
│   │   └── compare/            # Team comparison tools
│   └── components/             # Reusable UI components
```

### Survey Structure

The survey uses a sophisticated scoring system:

- **Questions**: Each rated on a 1-5 scale (Strongly Disagree to Strongly Agree)
- **Facet Scores**: Calculated as averages of component questions
- **Domain Scores**: Calculated as averages of component facets
- **Result Categories**: Low (< 2.5), Neutral (2.5-3.5), High (> 3.5)
- **Reverse Scoring**: One question uses reverse scoring for validation

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database (for result storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/agentfarm/teamwork-approaches-survey.git
   cd teamwork-approaches-survey/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:3000`

### Environment Variables

```env
# Database
MONGODB_URI=your_mongodb_connection_string
DB_COLLECTION=results

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_google_analytics_id

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Customization

### Modifying Questions

Questions are defined in `custom-questions.js`:

```javascript
{
  id: 'unique-uuid',
  text: 'Question text',
  keyed: 'plus', // or 'minus' for reverse scoring
  domain: 'C',   // Domain code (C, L, T, R, S, A)
  facet: 1       // Facet number within domain
}
```

### Updating Interpretations

Domain and facet descriptions are in `src/actions/index.ts` within the `domains` object. Each domain includes:

- Title and descriptions
- Facet definitions
- Result interpretations

### Styling and Branding

- Update `src/config/site.ts` for site configuration
- Modify `src/styles/globals.css` for custom styling
- Replace logos and icons in the `public/` directory

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Data Privacy & Security

The Teamwork Approaches Survey prioritizes user privacy:

- **Minimal Data Collection**: Only survey responses, timestamps, and language preferences
- **Anonymous Results**: No personally identifiable information required
- **Secure Storage**: Encrypted database connections and secure hosting
- **User Control**: Users control their data through unique IDs
- **GDPR Compliant**: Transparent data handling practices

For privacy questions, contact: [ville.eloranta@agentfarm.fi](mailto:ville.eloranta@agentfarm.fi)

## Research & Validation

The Teamwork Approaches Survey is based on established organizational psychology research covering:

- Team collaboration dynamics
- Leadership and innovation behaviors
- Learning and development patterns
- Technology adoption models
- Prosocial behavior in work contexts

For research inquiries or validation studies, please contact AgentFarm, Osk.

## Contributing

We welcome contributions to improve the survey experience:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas for Contribution

- Additional language translations
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- Documentation improvements

## Support

For support and questions:

- **Email**: [ville.eloranta@agentfarm.fi](mailto:ville.eloranta@agentfarm.fi)
- **Website**: [https://agentfarm.fi](https://agentfarm.fi)
- **Issues**: Create an issue in this repository

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About AgentFarm, Osk

AgentFarm, Osk specializes in developing innovative assessment tools and organizational development solutions. We combine research-based methodologies with modern technology to help teams and individuals reach their full potential.

Visit us at [agentfarm.fi](https://agentfarm.fi) to learn more about our work in organizational psychology and team effectiveness.

---

**© 2024 AgentFarm, Osk. All rights reserved.**