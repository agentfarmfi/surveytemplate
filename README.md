# Using This Repository as a Template

This repository serves as a complete template for creating custom multi-dimensional surveys. You can use it to build your own assessment tools for personality, teamwork, leadership, or any other multi-faceted evaluation.

## Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/teamtwins_teamworkapproachessurvey.git your-new-survey-name
cd your-new-survey-name
```

### 2. Prepare Your Survey Structure

Create a CSV file (e.g., `newstructure.csv`) with your survey questions and structure following this format:

```csv
Dimension X: Domain Name,,,,,Definition: Description of the domain
,Facet X1: Facet Name,,,,Definition: Description of facet X1
,,,Question:,Question text 1,
,,,Question:,Question text 2 (R),
,Facet X2: Facet Name,,,,Definition: Description of facet X2
,,,Question:,Question text 3,
,,,Question:,Question text 4,
Dimension Y: Another Domain,,,,,Definition: Description of another domain
,Facet Y1: Facet Name,,,,Definition: Description of facet Y1
,,,Question:,Question text 5,
,,,Question:,Question text 6 (R),
```

**Important formatting rules:**
- **Domain headers**: Start with "Dimension X:" where X is your domain letter code
- **Facet headers**: Start with "Facet X1:" where X matches the domain and 1 is the facet number
- **Questions**: Place "Question:" in column 4, question text in column 5
- **Reverse scoring**: Add "(R)" after questions that should be reverse-scored
- **Definitions**: Include "Definition:" followed by descriptive text
- **Structure**: Use consistent spacing and follow the hierarchy (Domain → Facet → Questions)

### 3. Implement Your Survey Structure

Once you have your CSV file ready, run this command to implement your new survey:

```bash
# Following the instructions in web/FULLINSTRUCTIONSFORQUESTIONSCHANGE.md implement the new survey question structure as in newstructure.csv
```

This command will:
- Extract questions from your CSV file
- Generate unique UUIDs for all questions
- Update domain descriptions and facet definitions
- Modify survey titles and metadata
- Update all application text to match your survey topic

### 4. Customize Your Survey

After implementing the basic structure, customize these elements:

#### Update Branding and Organization
- Replace "AgentFarm, Osk" with your organization name
- Update contact information and URLs
- Modify the footer and about page content
- Update the app manifest and SEO metadata

#### Customize Survey Metadata
Edit these files to match your survey:
- `web/src/messages/en.js` - Survey titles and descriptions
- `web/src/app/manifest.ts` - App name and description
- `web/src/app/[locale]/layout.tsx` - Page metadata and social media cards

#### Adjust Visual Design (Optional)
- Update colors and themes in `web/tailwind.config.js`
- Replace logos and icons in `web/public/`
- Modify styling in `web/src/styles/globals.css`

### 5. Test Your Survey

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:3000` to test your survey:
1. Complete the survey to verify all questions appear correctly
2. Check that results are calculated and displayed properly
3. Verify domain and facet descriptions are accurate
4. Test the download and sharing features

### 6. Deploy Your Survey

Once tested, deploy your survey:

```bash
npm run build
npm start
```

Or deploy to your preferred hosting platform (Vercel, Netlify, etc.).

## CSV Format Specification

### Complete Example

Here's a complete example showing the required CSV format:

```csv
Dimension P: Problem Solving,,,,,Definition: Problem Solving measures how individuals approach and resolve challenges in work environments.
,Facet P1: Analytical Thinking,,,,Definition: Analytical Thinking reflects the extent to which an individual uses logical reasoning and systematic analysis to understand problems.
,,,Question:,I break down complex problems into smaller components,
,,,Question:,I prefer to analyze all available data before making decisions,
,,,Question:,I avoid making decisions without thorough analysis (R),
,Facet P2: Creative Solutions,,,,Definition: Creative Solutions measures the tendency to generate innovative and original approaches to problems.
,,,Question:,I often come up with unique solutions to problems,
,,,Question:,I enjoy finding creative ways around obstacles,
,,,Question:,I stick to conventional methods rather than trying new approaches (R),
Dimension C: Communication,,,,,Definition: Communication measures how effectively individuals share information and collaborate with others.
,Facet C1: Verbal Expression,,,,Definition: Verbal Expression reflects the ability to clearly articulate ideas and thoughts through spoken communication.
,,,Question:,I express my ideas clearly in meetings,
,,,Question:,Others understand my explanations easily,
,,,Question:,I have difficulty explaining complex concepts to others (R),
,Facet C2: Active Listening,,,,Definition: Active Listening measures the ability to pay attention to and understand others' communications.
,,,Question:,I pay close attention when others are speaking,
,,,Question:,I ask clarifying questions to ensure understanding,
,,,Question:,I often miss important details in conversations (R),
```

### Key Requirements

1. **Domain Structure**
   - Each domain starts with "Dimension X:" where X is a unique letter code
   - Include domain definition after "Definition:"
   - Use clear, descriptive domain names

2. **Facet Structure**
   - Facets are indented under their domain
   - Format: "Facet X1:" where X matches domain letter and 1 is facet number
   - Include facet definition after "Definition:"
   - Each facet should have 2-6 questions

3. **Question Structure**
   - Questions are further indented under their facet
   - Place "Question:" in column 4, question text in column 5
   - Mark reverse-scored questions with "(R)" at the end
   - Write questions as statements respondents can agree/disagree with

4. **Content Guidelines**
   - Use clear, professional language
   - Avoid jargon or technical terms
   - Keep questions concise but specific
   - Ensure questions actually measure the intended facet
   - Balance positive and negative phrasing (using reverse scoring)

## Advanced Customization

### Scoring Modifications

The default scoring system uses:
- 1-5 scale for all questions
- Facet scores as averages of questions
- Domain scores as averages of facets
- Thresholds: Low (<2.5), Neutral (2.5-3.5), High (>3.5)

To modify scoring, edit `web/src/actions/index.ts` in the `calculateScore` and `calculateResult` functions.

### Adding Languages

To add multiple languages:
1. Create language-specific message files in `web/src/messages/`
2. Translate question text in your CSV
3. Update the language configuration in `web/src/i18n.ts`

### Custom Response Scales

To modify the 1-5 response scale:
1. Edit `web/custom-choices.js`
2. Update scoring logic in `web/src/actions/index.ts`
3. Adjust chart scales in result visualization components

## File Structure Overview

After cloning, your template will have this structure:

```
your-new-survey/
├── web/                                    # Main web application
│   ├── custom-questions.js                # Survey questions (auto-generated from CSV)
│   ├── custom-choices.js                  # Response options and scoring
│   ├── FULLINSTRUCTIONSFORQUESTIONSCHANGE.md  # Detailed implementation guide
│   ├── src/
│   │   ├── actions/index.ts               # Scoring logic and domain definitions
│   │   ├── messages/en.js                 # UI text and survey metadata
│   │   ├── app/[locale]/
│   │   │   ├── test/                      # Survey interface
│   │   │   ├── result/                    # Results display
│   │   │   ├── about/                     # About page
│   │   │   └── privacy/                   # Privacy policy
│   │   └── components/                    # Reusable UI components
│   ├── public/                            # Static assets (logos, icons)
│   └── package.json                       # Dependencies and scripts
├── README.md                              # Main documentation
├── USINGTHISREPOASTEMPLATE.md            # This file
└── newstructure.csv                       # Your survey structure (create this)
```

## Support and Best Practices

### Survey Design Best Practices

1. **Question Quality**
   - Use clear, unambiguous language
   - Avoid double-barreled questions (asking about two things at once)
   - Include both positively and negatively worded questions
   - Test questions with a small group before full deployment

2. **Structure Balance**
   - Aim for 3-6 facets per domain
   - Include 3-8 questions per facet
   - Balance question difficulty and complexity
   - Ensure comprehensive coverage of each construct

3. **Validation**
   - Test with representative participants
   - Analyze score distributions and reliability
   - Gather feedback on question clarity
   - Validate against established measures if possible

### Common Issues and Solutions

**Problem**: Questions not displaying correctly
**Solution**: Check CSV formatting, especially commas and quotation marks

**Problem**: Scoring seems incorrect
**Solution**: Verify reverse-scored questions are marked with "(R)"

**Problem**: Domains not appearing in results
**Solution**: Ensure domain codes in CSV match those in the implementation

**Problem**: Styling or branding issues
**Solution**: Update organization name and styling files as described above

### Getting Help

For technical issues with the template:
1. Check the `web/FULLINSTRUCTIONSFORQUESTIONSCHANGE.md` file for detailed instructions
2. Review the original implementation in this repository
3. Test each step incrementally rather than making all changes at once

For survey design questions:
1. Consult established psychological measurement literature
2. Consider hiring a psychometrician for validation
3. Test with small groups before full deployment

## License and Attribution

This template is based on the Teamwork Approaches Survey framework developed by AgentFarm, Osk. When using this template:

1. **Update all branding** to reflect your organization
2. **Replace sample content** with your own survey materials  
3. **Credit the original framework** if desired (but not required)
4. **Follow the MIT License** terms for any derived work

## Example Command Summary

Here's the complete workflow for creating a new survey:

```bash
# 1. Clone the template
git clone https://github.com/your-username/teamtwins_teamworlapproaches_survey.git my-new-survey
cd my-new-survey

# 2. Create your CSV file with survey structure
# (Edit newstructure.csv with your domains, facets, and questions)

# 3. Implement the new structure
# Following the instructions in web/FULLINSTRUCTIONSFORQUESTIONSCHANGE.md implement the new survey question structure as in newstructure.csv

# 4. Install and test
cd web
npm install
npm run dev

# 5. Customize branding and deploy
# (Update organization name, styling, etc.)
npm run build
```

Your new survey will be ready to deploy and share with participants!