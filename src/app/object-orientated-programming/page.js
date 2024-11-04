// object-orientated-programming/page.js

import OOPExplanation from '@/components/OOPExplanation';
import OOPExample from '@/components/OOPExample';

const OOPPage = () => {
  return (
    <div className="container mx-auto p-8">
      {/* Render the OOPExplanation component for descriptions and multimedia */}
      <OOPExplanation />

      {/* Render the OOPExample component to showcase interactive examples */}
      <OOPExample />
    </div>
  );
};

export default OOPPage;
