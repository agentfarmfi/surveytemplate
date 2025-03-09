import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';

interface ReadMoreProps {
  children: React.ReactNode;
  showExpanded?: boolean;
}

const ReadMore = ({ children, showExpanded = false }: ReadMoreProps) => {
  const text = children;
  const [isReadMoreShown, setReadMoreShown] = useState(false);

  const toggleReadMore = () => {
    setReadMoreShown(!isReadMoreShown);
  };

  return (
    <>
      {!showExpanded && (
        <Button
          className='my-2 print:hidden'
          onClick={toggleReadMore}
          size='sm'
          variant='bordered'
        >
          {isReadMoreShown ? 'Read less' : 'Read more'}
        </Button>
      )}
      
      {/* For normal screen viewing */}
      <div className="print:hidden">
        {(isReadMoreShown || showExpanded) && text}
      </div>
      
      {/* Always show full content in print with extra line break before */}
      <div className="hidden print:block">
        <div className="print-extra-space-before" style={{ marginTop: '1.5em' }}></div>
        {text}
      </div>
    </>
  );
};

export default ReadMore;
