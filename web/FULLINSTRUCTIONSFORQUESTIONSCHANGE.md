# Full Instructions for Changing Survey Questions and Logic

This document provides comprehensive instructions for implementing a new survey with different questions and scoring logic, based on the changes we've made to the Orientation Profile Survey.

## 1. Understanding the Survey Structure

### Key Files:
- `/custom-questions.js` - Contains all survey questions
- `/custom-choices.js` - Defines answer choices and scoring scales
- `/src/actions/index.ts` - Contains scoring logic and domain descriptions
- `/src/messages/en.js` - Contains text labels and descriptions
- `/src/app/[locale]/layout.tsx` - Contains meta tags and titles
- `/src/app/[locale]/result/[id]/page.tsx` - Contains results page metadata

### Domain and Facet Structure:
- Questions are organized by domains (e.g., P, S, W, E, C)
- Each domain has multiple facets (e.g., P1, P2, P3)
- The scoring system aggregates answers by domain and facet

## 2. Preparing New Survey Questions

1. **Create a CSV file with the following format:**
   ```
   Dimension X: Domain Name,,,,,Definition: Description of the domain
   ,Facet X1: Facet Name,,,,Definition: Description of facet X1
   ,,,Question:,Question text 1,
   ,,,Question:,Question text 2 (R),
   ,Facet X2: Facet Name,,,,Definition: Description of facet X2
   ,,,Question:,Question text 3,
   ```

2. **Format requirements:**
   - Domain descriptions at the top of each section
   - Facet descriptions before each group of questions
   - Questions marked with (R) for reverse scoring
   - Keep consistent spacing/formatting

## 3. Implementation Process

### Step 1: Create Questions File
1. Extract questions from CSV and format them as a JavaScript array:
   ```javascript
   export default [
     {
       id: 'uuid-1',
       text: 'Question text',
       keyed: 'plus', // or 'minus' for reverse scoring
       domain: 'X',
       facet: 1
     },
     // More questions...
   ]
   ```

2. Generate UUIDs for each question
3. Group questions by domain and facet
4. Set `keyed: 'minus'` for questions marked with (R)

### Step 2: Update Domain Descriptions
1. Extract domain and facet definitions from CSV
2. Update the `domains` object in `generateResult()` function in `/src/actions/index.ts`:
   ```javascript
   const domains = {
     X: {
       title: 'Domain Name',
       shortDescription: 'Brief description',
       description: `Detailed description...`,
       facets: [
         {
           facet: 1,
           title: 'Facet X1',
           text: `Description of facet X1...`
         },
         // More facets...
       ]
     },
     // More domains...
   };
   ```

3. Update the `domainList` array to include all domains:
   ```javascript
   const domainList = [
     { 
       domain: 'X',
       title: domains.X.title, 
       facets: domains.X.facets,
       description: domains.X.shortDescription,
       text: domains.X.description
     },
     // More domains...
   ];
   ```

### Step 3: Update Application Texts
1. Change survey title and descriptions in `/src/messages/en.js`:
   ```javascript
   frontpage: {
     seo: {
       title: 'New Survey Name - Aalto University',
       description: 'Take the New Survey Name to...'
     },
     title: 'New Survey Name',
     // Other properties...
   }
   ```

2. Update metadata in layout and result pages:
   - `/src/app/[locale]/layout.tsx` - For OpenGraph and Twitter cards
   - `/src/app/[locale]/result/[id]/page.tsx` - For result page metadata
   
   ```javascript
   // In result/[id]/page.tsx - This controls the PDF filename when printing
   export async function generateMetadata({
     params: { locale }
   }: {
     params: { locale: string };
   }) {
     const t = await getTranslations({ locale, namespace: 'results' });
     return {
       title: 'My results from the New Survey Name - Aalto University',
       description: 'See my results from the New Survey Name'
     };
   }
   ```

3. Update file names for downloads in `/src/components/share-bar.tsx`:
   ```javascript
   // For JSON downloads
   linkElement.setAttribute('download', `new-survey-name-${report.id}.json`);
   ```

4. Important: The PDF filename comes from the HTML document title, which is set in the metadata of the results page. Make sure to update this to ensure PDFs have the correct filename when users print their results.

## 4. Testing Process

1. Back up original files before making changes:
   ```bash
   cp /Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js /Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js.bak
   cp /Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts /Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts.bak
   ```

2. Verify implementation:
   - Check question counts per domain with: 
     ```bash
     grep -o "domain: '[A-Z]'" custom-questions.js | sort | uniq -c
     ```
   - Check for domain definitions with:
     ```bash
     grep -A2 "title: 'Domain Name'" src/actions/index.ts
     ```
   - Check that domain is included in processing:
     ```bash
     grep -A2 "domain: 'X'" src/actions/index.ts
     ```

3. Test the survey:
   - Run the application with `yarn dev` or `npm run dev`
   - Complete a test survey
   - Verify that all domains and facets display correctly
   - Check that scoring logic works for both normal and reversed questions

## 5. Handling Previous Test Data

The application stores test progress in localStorage, which may cause issues when testing:

1. If you see pre-selected answers, look for a warning banner with an option to "start a new test"
2. Alternatively, clear localStorage manually:
   - Open browser Developer Tools (F12)
   - Go to Application tab > Local Storage
   - Delete items named `inProgress` and `b5data`

## 6. Customization Options

1. **Modifying answer choices**: Edit `/custom-choices.js` to change the available answers or scoring scales

2. **Changing scoring logic**: Modify `calculateScore()` and `calculateResult()` functions in `/src/actions/index.ts`:
   - Currently uses thresholds of 2.5 (low) and 3.5 (high) on a 1-5 scale
   - Calculates facet averages first, then domain averages

3. **Adjusting display**: Modify result display in `/src/app/[locale]/result/[id]/domain.tsx`

## 7. Implementation Best Practices

1. Always keep backups of original files
2. Test thoroughly after each major change
3. Use unique UUIDs for all questions
4. Ensure domain and facet descriptions match the survey's theoretical framework
5. Verify that all text mentions of the survey name are consistent

## 8. Rollback Plan

If issues are encountered, restore from backups:
```bash
cp /Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js.bak /Users/oelorant/teamtwins_orientationprofilesurvey/web/custom-questions.js
cp /Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts.bak /Users/oelorant/teamtwins_orientationprofilesurvey/web/src/actions/index.ts
```