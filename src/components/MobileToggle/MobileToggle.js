import React from 'react';
import { Eye, Edit3 } from 'lucide-react';

function MobileToggle({ handleToggle, mobile }) {
  return (
    <button
      type="button"
      className="lg:hidden fixed bottom-6 right-6 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition flex items-center gap-2 z-50"
      onClick={handleToggle}
    >
      {mobile.formIsOpen ? (
        <>
          <Eye size={20} />
          <span>Preview</span>
        </>
      ) : (
        <>
          <Edit3 size={20} />
          <span>Editor</span>
        </>
      )}
    </button>
  );
}

export default MobileToggle;
