'use client';

import { Button, Tooltip } from '@nextui-org/react';
import { CopyIcon, CopyJSONIcon, JSONIcon, PDFIcon } from './icons';
import { Report } from '@/actions/index';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface ShareBarProps {
  report: Report;
}

export default function ShareBar({ report }: ShareBarProps) {
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => async () => await copy(text);

  const prepareJSONData = () => {
    // Create a copy of the report without availableLanguages
    const { availableLanguages, ...reportWithoutLanguages } = report;
    
    // Create a deep copy of the results without count attributes
    const cleanedResults = reportWithoutLanguages.results.map(domain => {
      // Remove count from domain
      const { count, ...domainWithoutCount } = domain;
      
      // Remove count and facet attributes from each facet
      const cleanedFacets = domain.facets.map(facet => {
        const { count, facet: facetNumber, ...facetWithoutUnwanted } = facet;
        return facetWithoutUnwanted;
      });
      
      // Return domain with cleaned facets
      return {
        ...domainWithoutCount,
        facets: cleanedFacets
      };
    });
    
    // Return final cleaned report
    return JSON.stringify({
      ...reportWithoutLanguages,
      results: cleanedResults
    }, null, 2);
  };

  const handleDownloadJSON = () => {
    const dataStr = prepareJSONData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `bigfive-result-${report.id}.json`);
    linkElement.click();
  };
  
  const handleCopyJSON = async () => {
    const dataStr = prepareJSONData();
    await copy(dataStr);
  };

  return (
    <>
      <Tooltip color='secondary' content='Download PDF'>
        <Button
          isIconOnly
          aria-label='Download pdf'
          radius='full'
          size='md'
          variant='light'
          onPress={() => window.print()}
        >
          <PDFIcon size={32} />
        </Button>
      </Tooltip>
      <Tooltip color='secondary' content='Download JSON'>
        <Button
          isIconOnly
          aria-label='Download JSON'
          radius='full'
          size='md'
          variant='light'
          onPress={handleDownloadJSON}
        >
          <JSONIcon size={32} />
        </Button>
      </Tooltip>
      <Tooltip color='secondary' content='Copy JSON to clipboard'>
        <Button
          isIconOnly
          aria-label='Copy JSON to clipboard'
          radius='full'
          size='md'
          variant='light'
          onPress={handleCopyJSON}
        >
          <CopyJSONIcon size={32} />
        </Button>
      </Tooltip>
      <Tooltip color='secondary' content='Copy link'>
        <Button
          isIconOnly
          aria-label='Copy link'
          radius='full'
          size='md'
          variant='light'
          onPress={handleCopy(`https://bigfive-test.com/result/${report.id}`)}
        >
          <CopyIcon size={42} />
        </Button>
      </Tooltip>
    </>
  );
}
