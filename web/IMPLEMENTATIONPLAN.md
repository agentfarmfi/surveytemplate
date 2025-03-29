# Implementation Plan for Survey Question Changes

This document outlines the step-by-step process to implement the new questions from QUESTIONS.csv into the survey application.

## 1. Parse and Format Questions

First, we need to extract the questions from QUESTIONS.csv and convert them to the format required by `custom-questions.js`.

### Questions to Extract:

From analyzing QUESTIONS.csv, we will implement questions for 5 dimensions:
- P: Psychological Capital (facets 1-3)
- S: Social Orientation (facets 1-4)
- W: Work Goal Orientation (facets 1-3)
- E: Entrepreneurial Orientation (facets 1-3)
- C: Cognitive Style (facets 1-3) - This is a new dimension

### Question Formatting Requirements:
- Generate UUID for each question
- Set keyed="minus" for questions marked with (R)
- Set keyed="plus" for all other questions
- Map domains and facets directly from the CSV

## 2. Update custom-questions.js

Create a new version of `custom-questions.js` with the extracted questions, following this structure:

```javascript
export default [
  // Dimension P: Psychological Capital - Self-efficacy beliefs (facet 1)
  {
    id: 'uuid-1',
    text: 'When facing difficult tasks, I am certain that I will accomplish them',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  // More questions...
]
```

## 3. Update Domain Descriptions in actions/index.ts

Update the `generateResult()` function to:
1. Add the new "C" dimension (Cognitive Style)
2. Update descriptions for all dimensions and facets based on definitions in QUESTIONS.csv
3. Ensure all facets have appropriate high/low score interpretations

## 4. Implementation Tasks

### Task 1: Generate Question File
- Extract all questions from QUESTIONS.csv
- Generate UUIDs for each question
- Format as required for custom-questions.js
- Group by dimension and facet

### Task 2: Update Domain Definitions
- Extract dimension and facet definitions from QUESTIONS.csv
- Update domain descriptions in `generateResult()` function
- Add the new "C" dimension to the domainList array

### Task 3: Update Scoring Logic (if needed)
- Review scoring thresholds (currently high>3.5, low<2.5)
- Ensure scoring logic handles the new "C" dimension

### Task 4: Test Implementation
- Run the survey with sample responses
- Verify correct scoring for normal and reversed questions
- Check that all dimensions and facets display properly in results

## 5. Detailed Implementation Steps

1. Create a new `custom-questions.js` file with all questions from QUESTIONS.csv
2. Update the `domains` object in `generateResult()` to include all dimensions and facets
3. Add the new "C" dimension to the `domainList` array
4. Test the survey end-to-end

## 6. Testing Strategy

1. Complete the survey with all "Very Accurate" responses
2. Complete the survey with all "Very Inaccurate" responses
3. Complete the survey with random responses
4. Verify scoring calculations for both normal and reversed questions
5. Check that dimension and facet descriptions display correctly

## 7. Rollback Plan

Keep backup copies of:
- custom-questions.js
- actions/index.ts

This will allow quick restoration if issues are encountered.