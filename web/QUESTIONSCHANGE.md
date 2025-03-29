# Instructions for Changing Survey Questions

This document outlines the process for replacing the survey questions and updating the associated scoring logic.

## Step 1: Prepare Your CSV Question File

Your `QUESTIONS.csv` file should follow this format:
```
id,text,domain,facet,keyed
1,"I am confident in my abilities",P,1,plus
2,"I avoid taking risks",E,2,R
```

The columns should include:
- `id`: A unique identifier for each question (will be converted to UUID)
- `text`: The question text
- `domain`: Single letter representing the domain (P, S, W, E)
- `facet`: Numeric value representing the facet within the domain
- `keyed`: Either "plus" for normal scoring or "R" for reversed scoring

## Step 2: Convert CSV to Question Format

1. Use a script or tool to convert your CSV file to the format required by the application
2. For each question in your CSV:
   - Generate a UUID for the `id` field if not provided
   - Map the domain and facet values directly
   - Set `keyed` to "plus" for normal scoring or "minus" for reversed questions marked with "R"

## Step 3: Update Custom Questions File

1. Open `/Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js`
2. Replace the entire array with your new questions
3. Ensure questions are grouped by domain and facet for readability
4. Maintain the same structure:
   ```javascript
   export default [
     {
       id: 'uuid-string',
       text: 'Question text',
       keyed: 'plus',  // or 'minus' for reverse scored
       domain: 'P',    // P, S, W, or E
       facet: 1        // numeric facet value
     },
     // more questions...
   ]
   ```

## Step 4: Verify Answer Choices (Optional)

1. Review `/Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-choices.js`
2. Modify if you need different answer options or scoring scales
3. The current system uses a 5-point scale:
   - For `keyed: 'plus'` questions: 1 (Very Inaccurate) to 5 (Very Accurate)
   - For `keyed: 'minus'` questions: 5 (Very Inaccurate) to 1 (Very Accurate)

## Step 5: Update Domain Descriptions

1. Open `/Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts`
2. Locate the `generateResult()` function (around line 96)
3. Update the domain descriptions to match your new question set:
   - Modify domain titles, short descriptions, and detailed text
   - Update facet titles and interpretations
   - Ensure descriptions explain what high and low scores mean for each domain/facet

## Step 6: Test the Survey

1. Check that all questions display correctly
2. Verify that scoring works as expected
3. Test both normal and reversed scoring
4. Confirm that results accurately reflect the new domain and facet descriptions

## Technical Details

### Scoring Logic

The scoring system works as follows:
- Answers are grouped by domain and facet
- Facet scores are averaged on a 1-5 scale
- Domain scores are calculated by averaging their facet scores
- Results are categorized as:
  - "high": score > 3.5
  - "low": score < 2.5
  - "neutral": between 2.5 and 3.5

### Question Structure

Each question requires:
- `id`: Unique identifier (UUID)
- `text`: The question text to display
- `keyed`: Scoring direction ("plus" or "minus")
- `domain`: Letter code for the dimension (P, S, W, E)
- `facet`: Numeric identifier for the facet within the domain

### File Locations

- Questions: `/Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js`
- Answer choices: `/Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-choices.js`
- Scoring logic: `/Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts`
- Domain descriptions: `/Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts` (generateResult function)
- Survey UI: `/Users/oelorant/teamtwins_orientationprofilesurvey/web/src/app/[locale]/test/survey.tsx`