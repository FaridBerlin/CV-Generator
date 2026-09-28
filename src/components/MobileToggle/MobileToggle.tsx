import { Eye, Edit3 } from 'lucide-react';
import type { MobileState } from '../../types/cv';

interface MobileToggleProps {
  handleToggle: () => void;
  mobile: MobileState;
}

function MobileToggle({ handleToggle, mobile }: MobileToggleProps) {
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
