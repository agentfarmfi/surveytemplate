import { useState } from 'react';

interface ReadMoreProps {
  children: React.ReactNode;
  showExpanded?: boolean;
}

const ReadMore = ({ children, showExpanded = false }: ReadMoreProps) => {
  const text = children;
  const [isReadMoreShown, setReadMoreShown] = useState(false);

  const toggleReadMore = () => {
    console.log('Read more/less button clicked');
    setReadMoreShown(!isReadMoreShown);
  };

  return (
    <div className="mb-4">
      {!showExpanded && (
        <div
          className='mt-3 mb-2 print:hidden inline-flex px-3 py-1 border border-gray-300 rounded-md cursor-pointer touch-manipulation'
          style={{ minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
          onClick={toggleReadMore}
          aria-label={isReadMoreShown ? 'Read less' : 'Read more'}
        >
          {isReadMoreShown ? 'Read less' : 'Read more'}
        </div>
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
