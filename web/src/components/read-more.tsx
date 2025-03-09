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
    <div className="mb-4">
      {!showExpanded && (
        <Button
          className='mt-3 mb-2 print:hidden'
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
      
      {/* Always show full content in print */}
      <div className="hidden print:block">
        {text}
      </div>
    </div>
  );
};

export default ReadMore;
