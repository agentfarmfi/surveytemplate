# Leadership Assessment Dimensions Remapping

This document describes the changes made to the dimension structure of the Change and Leadership Assessment, specifically focusing on the remapping of facets between domains.

## Overview of Changes

The assessment underwent a reorganization to better reflect a hierarchical leadership model that distinguishes between Strategic Leadership and Operational Leadership dimensions. This involved:

1. Renaming dimensions to clarify their hierarchical relationships
2. Reordering dimensions in the results display
3. Moving the "Providing Feedback" facet from "Results Management" to "Building Relationships"

## Specific Dimension Changes

### Dimension Renaming
- "Change Leadership" → "Strategic Leadership - Driving Change"
- "People Development" → "Strategic Leadership - People Development"
- "Results Management" → "Operational Leadership - Results Management"
- "Relationship Leadership" → "Operational Leadership - Building Relationships"
- "Empowering Leadership" → "Empowering Leadership Approach"
- "Directive Leadership" → "Directive Leadership Approach"

### Dimension Reordering
The dimensions now follow this order:
1. Strategic Leadership - Driving Change (C)
2. Strategic Leadership - People Development (D)
3. Operational Leadership - Results Management (T)
4. Operational Leadership - Building Relationships (L)
5. Empowering Leadership Approach (E)
6. Directive Leadership Approach (N)
7. Technology Readiness (R)
8. Work Goal Orientation (W)
9. Technology Adoption Attitude (A)

### Facet Movement
The "Providing Feedback" facet was moved:
- **From**: "Results Management" (domain 'T', facet 4)
- **To**: "Building Relationships" (domain 'L', facet 3)

## Technical Implementation Details

### Files Modified
1. `/src/actions/index.ts`
   - Updated domain titles and descriptions
   - Added "Providing Feedback" facet to domain L
   - Removed "Providing Feedback" facet from domain T
   - Updated the domain order in the `domainList` array
   - Added facet remapping logic in the `calculateScore` function

2. `/custom-questions.js`
   - Updated domain and facet references for feedback questions
   - Updated dimension names in comments

### Backward Compatibility

To maintain backward compatibility with existing assessment results in the database (where "Providing Feedback" questions were stored as domain 'T', facet 4), we implemented a remapping logic in the `calculateScore` function:

```javascript
// Handle the migration of "Providing Feedback" from T4 to L3
// This ensures that existing test results continue to work correctly
let domain = answer.domain;
let facet = answer.facet;

// Remap T4 (Providing Feedback) to L3
if (domain === 'T' && facet === 4) {
  domain = 'L';
  facet = 3;
}
```

This approach ensures that:
- New assessments taken after the changes will correctly store feedback questions under domain L, facet 3
- Existing assessment results where feedback questions were stored under domain T, facet 4 will be correctly displayed in the new structure

## Testing

The changes were tested by:
1. Verifying that all domain titles and descriptions were updated correctly
2. Ensuring the facet definitions were correctly reassigned
3. Confirming that the "Providing Feedback" facet appears under the "Operational Leadership - Building Relationships" domain in the results visualization

## Future Considerations

If making additional structural changes to the assessment in the future:
1. Always update the `calculateScore` function to handle any domain/facet remappings
2. Ensure all facet definitions are updated in the appropriate domain objects
3. Update the dimension names in comments in `custom-questions.js` for clarity
4. Consider adding a version identifier to assessment results if major structural changes are implemented