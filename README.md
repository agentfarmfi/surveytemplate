# othertest - Customizable Survey Framework

## About This Repository

This repository provides a flexible framework for creating and deploying personality assessments or other multi-dimensional surveys. Originally designed for the Big Five personality test, it has been adapted to support custom survey creation with any number of domains, facets, and questions.

Key features:
- Create custom multi-dimensional surveys
- Define your own domains (dimensions) and facets
- Develop customized scoring algorithms
- Visualize results with interactive charts
- Support for multiple languages
- Modern web interface with responsive design

The system uses a modular architecture with three main packages:
- **questions**: Defines survey structure, questions, and response options
- **score**: Handles scoring calculations and result generation
- **results**: Manages result interpretations and visualization

## Custom Survey Creation Guide

### Introduction

This framework allows you to create personality or assessment surveys with:
- Custom domains (dimensions)
- Custom facets within each domain
- Custom questions for each facet
- Customizable scoring system
- Visualization of results

The current implementation uses a 1-5 scoring scale where:
- Each question is scored 1-5
- Facet scores are calculated as the average of question scores (1-5 scale)
- Domain scores are calculated as the average of facet scores (1-5 scale)

### Step-by-Step Guide

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/othertest.git
cd othertest
```

#### 2. Project Structure Overview

The framework consists of three main packages:
- `questions`: Defines the survey structure, questions, and choices
- `score`: Handles scoring calculations
- `results`: Defines result interpretations and visualization

For a custom survey, you'll need to modify:
1. Questions structure and content
2. Result interpretations
3. (Optionally) Scoring logic

#### 3. Define Your Survey Domains and Facets

First, plan your survey structure:
1. Identify the main domains (dimensions) you want to measure
2. Define facets for each domain
3. Determine how many questions per facet

Example structure:
```
Domain A
  ├─ Facet A1 (4 questions)  
  ├─ Facet A2 (3 questions)  ← Note: Different number of questions per facet is supported
  └─ Facet A3 (5 questions)
Domain B
  ├─ Facet B1 (6 questions)  
  └─ Facet B2 (2 questions)  ← Even significant differences in question count work fine
Domain C
  ├─ Facet C1 (3 questions)
  ├─ Facet C2 (3 questions)
  ├─ Facet C3 (3 questions)
  └─ Facet C4 (3 questions)  ← Or you can keep question counts the same if preferred
```

#### 4. Create Custom Questions

##### 4.1. Update domains in questions file

Edit the file `/packages/questions/src/data/en/questions.ts`:

```typescript
const questions = [
  // Domain A - Facet A1 questions
  {
    id: 'unique-id-1', // Generate unique IDs for each question
    text: 'Your question text here',
    keyed: 'plus', // 'plus' or 'minus' for scoring direction
    domain: 'A', // Your domain code
    facet: 1 // Facet number within the domain
  },
  // More questions...
]

export default questions
```

**Key elements:**
- **id**: Unique identifier for each question
- **text**: The question text shown to respondents
- **keyed**: 
  - 'plus': Higher response values give higher scores
  - 'minus': Higher response values give lower scores (reversed scoring)
- **domain**: Letter code for the domain (A, B, C, etc.)
- **facet**: Number for the facet within the domain (1, 2, 3, etc.)

**Organizing questions:**
- Group questions by domain and facet with comments
- Facets can have different numbers of questions - the scoring system handles this by using averages
- There is no requirement for all facets to have the same number of questions

##### 4.2. Create response choices

The choices file (`/packages/questions/src/data/en/choices.ts`) defines the answer options:

```typescript
export default {
  plus: [
    {
      text: 'Very Inaccurate',
      score: 1,
      color: 1
    },
    // Other options...
    {
      text: 'Very Accurate',
      score: 5,
      color: 5
    }
  ],
  minus: [
    // Reversed scoring for minus-keyed questions
    {
      text: 'Very Inaccurate',
      score: 5,
      color: 1
    },
    // Other options...
    {
      text: 'Very Accurate',
      score: 1,
      color: 5
    }
  ]
}
```

You can customize the text of choices based on your survey needs (e.g., "Strongly Disagree" to "Strongly Agree").

#### 5. Define Result Interpretations

##### 5.1. Update domain definitions

Edit `/packages/results/src/data/en/index.ts` to define your domains:

```typescript
import DomainA from './domain_a'
import DomainB from './domain_b'
import DomainC from './domain_c'

const domains = [DomainA, DomainB, DomainC]

export default domains
```

##### 5.2. Create domain interpretation files

For each domain, create a file (e.g., `/packages/results/src/data/en/domain_a.ts`):

```typescript
import { type TemplateDomain } from '../../types'

const domainA: TemplateDomain = {
  domain: 'A', // Match the domain code from questions
  title: 'Domain A Title',
  shortDescription: 'Brief description of Domain A',
  description: `Detailed description of what Domain A measures...`,
  results: [
    {
      score: 'low', // Result for low scores
      text: `Interpretation for low scores on Domain A...`
    },
    {
      score: 'neutral', // Result for neutral scores
      text: `Interpretation for neutral scores on Domain A...`
    },
    {
      score: 'high', // Result for high scores
      text: `Interpretation for high scores on Domain A...`
    }
  ],
  facets: [
    {
      facet: 1, // Match the facet number from questions
      title: 'Facet A1',
      text: `Description of what Facet A1 measures...`
    },
    // Define other facets...
  ]
}

export default domainA
```

Create similar files for each domain.

#### 6. Customize Scoring Logic (Optional)

The scoring logic is defined in `/packages/score/src/index.ts` and `/web/src/actions/index.ts`. 

The default scoring system:
1. Calculates average scores for each facet (1-5 scale), regardless of how many questions the facet has
2. Calculates domain scores as averages of their facets, giving each facet equal weight regardless of question count
3. Classifies results as:
   - 'high' if average > 3.5
   - 'low' if average < 2.5
   - 'neutral' otherwise

This scoring approach ensures that:
- Facets with more questions don't dominate the domain score
- Each facet contributes equally to its domain score
- You have flexibility to use different numbers of questions for different facets

You can modify these thresholds or create more complex scoring logic if needed.

#### 7. Update Web Interface

##### 7.1. Set up custom question loading

If you're making significant changes to the structure, you'll need to modify:
- `/web/src/app/[locale]/test/page.tsx` - Handles loading questions
- `/web/src/app/[locale]/test/survey.tsx` - Displays the survey

##### 7.2. Customize results visualization

You may want to customize:
- `/web/src/app/[locale]/result/[id]/page.tsx` - Results page
- `/web/src/app/[locale]/result/[id]/domain.tsx` - Domain display
- `/web/src/components/bar-chart.tsx` - Chart visualization

Key modifications include:
- Updating the chart scales
- Changing color coding for domains
- Adjusting result text display

#### 8. Testing Your Survey

1. Start the development server:
```bash
cd web
npm run dev
```

2. Navigate to the test page (usually http://localhost:3000/test)
3. Complete the survey to verify all questions appear correctly
4. Submit the survey to check that results are calculated and displayed properly
5. Verify that facet and domain scores are calculated as expected
6. Check that interpretations are displayed correctly

#### 9. Deploying Your Survey

Once you've tested your survey thoroughly, you can:
1. Build the web application:
```bash
cd web
npm run build
```

2. Deploy to your preferred hosting platform
3. Set up a database for storing results if needed

### Advanced Customization

#### Custom Scoring Algorithms

For complex scoring systems, modify:
- `/web/src/actions/index.ts` - `calculateScore` function
- You can implement weighted scores, normalization, or other statistical methods

#### Adding Multiple Languages

1. Duplicate your questions and result files with language codes
2. Translate the content
3. Update the language selection in the web interface

#### Results Data Visualization

You can enhance result visualization with:
- Additional chart types
- Comparative visualizations
- Downloadable reports

### Troubleshooting

#### Common Issues

1. **Questions not appearing**: Check question IDs and domain/facet codes
2. **Scoring problems**: Verify keyed directions and scoring logic
3. **Display issues**: Inspect chart configuration and scales
4. **Missing result texts**: Ensure all domains and facets have properly defined texts

#### Debugging Tips

1. Use browser developer tools to inspect data
2. Add console.log statements to track scoring calculations
3. Start simple and add complexity gradually

### Current Implementation: Entrepreneurship Orientation Survey

This repository currently includes an implementation of a fictional Entrepreneurship Orientation assessment as an example. This survey demonstrates how to create a custom multi-dimensional assessment using the framework.

#### Survey Structure

The entrepreneurship survey measures three key domains:

1. **Risk Tolerance (R)**
   - Uncertainty Comfort (4 questions)
   - Financial Risk-Taking (4 questions)
   - Resilience to Failure (4 questions)

2. **Innovation (I)**
   - Creative Ideation (6 questions)
   - Practical Application (6 questions)

3. **Planning & Execution (P)**
   - Goal Setting (4 questions)
   - Strategic Planning (4 questions)
   - Performance Monitoring (3 questions)
   - Execution Discipline (3 questions)

#### Implementation Examples

**Domain Definition (Risk Tolerance):**
```typescript
// /packages/results/src/data/en/risk_tolerance.ts
const riskTolerance: TemplateDomain = {
  domain: 'R',
  title: 'Risk Tolerance',
  shortDescription: 'Risk Tolerance measures your comfort level with uncertainty and willingness to take calculated risks.',
  description: `Risk Tolerance is a critical trait for entrepreneurship that reflects your 
  willingness to make decisions under uncertainty and take calculated risks...`,
  results: [
    {
      score: 'low',
      text: `Your score on Risk Tolerance is low, indicating you prefer stability and 
      certainty in business situations...`
    },
    {
      score: 'neutral',
      text: `Your score on Risk Tolerance is moderate, suggesting you balance caution with a 
      willingness to take calculated risks...`
    },
    {
      score: 'high',
      text: `Your score on Risk Tolerance is high, indicating you're comfortable with uncertainty 
      and willing to take calculated risks...`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Uncertainty Comfort',
      text: `This facet measures how comfortable you feel in ambiguous or uncertain situations...`
    },
    // Other facets defined here...
  ]
}
```

**Question Examples:**
```typescript
// /packages/questions/src/data/en/questions.ts
const questions = [
  // Risk Tolerance - Uncertainty Comfort (facet 1)
  {
    id: '43c98ce8-a07a-4dc2-80f6-c1b2a2485f06',
    text: 'I enjoy taking calculated risks in business',
    keyed: 'plus',
    domain: 'R',
    facet: 1
  },
  {
    id: '0727def6-3d18-4221-bf38-86b58f9f3eed',
    text: 'I thrive in uncertain environments',
    keyed: 'plus',
    domain: 'R',
    facet: 1
  },
  
  // Innovation - Creative Ideation (facet 1)
  {
    id: 'd50a597f-632b-4f7b-89e6-6d85b50fd1c9',
    text: 'I look for opportunities where others see problems',
    keyed: 'plus',
    domain: 'I',
    facet: 1
  },
  
  // Planning & Execution - Goal Setting (facet 1)
  {
    id: '888dd864-7449-4e96-8d5c-7a439603ea91',
    text: 'I set clear goals and work systematically to achieve them',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  
  // Reversed scoring example
  {
    id: 'e2028ad3-b128-4f76-be57-398bfe2aff22',
    text: 'I prefer steady income over potential high rewards with uncertainty',
    keyed: 'minus',
    domain: 'R',
    facet: 3
  }
  // More questions defined for each facet...
]
```

**Scoring Implementation:**
The survey uses the 1-5 scale scoring system with averaging:
- Each question is scored 1-5
- Facet scores are calculated as the average of their questions
- Domain scores are calculated as the average of their facets
- Scores > 3.5 are classified as "High", < 2.5 as "Low", and others as "Average"

#### Result Visualization

The results are displayed with:
- Color-coded domains (Risk Tolerance: red, Innovation: yellow, Planning: green)
- Bar charts showing domain and facet scores on a 1-5 scale
- Detailed interpretations for each score level
- Facet breakdowns within each domain

This example demonstrates how you can create a complete custom survey with multiple domains and facets, personalized scoring, and detailed result interpretations.

### Example: Minimal Survey Setup

For a minimal custom survey with 2 domains and 2 facets each:

```typescript
// questions.ts
const questions = [
  {
    id: 'q1',
    text: 'Question 1',
    keyed: 'plus',
    domain: 'X',
    facet: 1
  },
  // More questions...
]
```

This minimal setup demonstrates the essential components needed for a functioning survey.

## Contributing

Contributions are welcome! If you'd like to improve the framework or add new features, please fork the repository and submit a pull request.

## Help with Translations

If you want to help by translating the items to other languages look [here](https://b5.translations.alheimsins.net/).

## License

[MIT](LICENSE)