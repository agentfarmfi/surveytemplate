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
    
    // Extract only facets from each domain, removing domain-level data
    const facetsOnly = reportWithoutLanguages.results.flatMap(domain => {
      // Extract and clean each facet
      return domain.facets.map((facet: any) => {
        const { count, facet: facetNumber, ...facetWithoutUnwanted } = facet;
        return {
          domain: domain.domain,
          domainTitle: domain.title,
          ...facetWithoutUnwanted
        };
      });
    });
    
    // Return final cleaned report with only facets
    return JSON.stringify({
      id: reportWithoutLanguages.id,
      timestamp: reportWithoutLanguages.timestamp,
      language: reportWithoutLanguages.language,
      facets: facetsOnly
    }, null, 2);
  };

  const handleDownloadJSON = () => {
    const dataStr = prepareJSONData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `change-and-leadership-assessment-${report.id}.json`);
    linkElement.click();
  };
  
  const handleCopyJSON = async () => {
    const dataStr = prepareJSONData();
    await copy(dataStr);
  };

  return (
    <>
      <Tooltip color='secondary' content='Download PDF' className="print:hidden">
        <Button
          isIconOnly
          aria-label='Download pdf'
          radius='full'
          size='md'
          variant='light'
          onPress={() => window.print()}
          className="print:hidden"
        >
          <PDFIcon size={32} />
        </Button>
      </Tooltip>
      <Tooltip color='secondary' content='Download JSON' className="print:hidden">
        <Button
          isIconOnly
          aria-label='Download JSON'
          radius='full'
          size='md'
          variant='light'
          onPress={handleDownloadJSON}
          className="print:hidden"
        >
          <JSONIcon size={32} />
        </Button>
      </Tooltip>
      <Tooltip color='secondary' content='Copy JSON to clipboard' className="print:hidden">
        <Button
          isIconOnly
          aria-label='Copy JSON to clipboard'
          radius='full'
          size='md'
          variant='light'
          onPress={handleCopyJSON}
          className="print:hidden"
        >
          <CopyJSONIcon size={32} />
        </Button>
      </Tooltip>
    </>
  );
}
