import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { defaultContraindications } from '@/lib/exercises';

interface HealthNoticeProps {
  title?: string;
  description?: string;
  footer?: string;
}

const HealthNotice: React.FC<HealthNoticeProps> = ({ 
  title = "Health and Safety Notice",
  description = "Always prioritize your well-being. Each exercise includes specific contraindications (conditions when you should avoid that movement). All exercises should be avoided if you have:",
  footer = "Always consult with your healthcare provider before beginning any exercise program, especially during the postpartum period."
}) => {
  const [showAllContraindications, setShowAllContraindications] = useState(false);

  return (
    <div className="bg-mama-light-pink p-4 rounded-lg animate-fade-in" style={{animationDelay: "0.05s"}}>
      <div className="flex items-start">
        <AlertCircle className="text-mama-dark-text mr-3 flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-medium text-mama-dark-text mb-1">{title}</h3>
          <p className="text-sm text-mama-dark-text mb-2">
            {description}
          </p>
          <ul className="text-sm text-mama-dark-text list-disc pl-5 mb-2">
            {defaultContraindications.slice(0, 3).map((contraindication, index) => (
              <li key={index}>{contraindication}</li>
            ))}
            {!showAllContraindications && defaultContraindications.length > 3 && (
              <li>
                <button 
                  className="text-mama-dark-text font-medium underline hover:no-underline"
                  onClick={() => setShowAllContraindications(true)}
                >
                  See all contraindications...
                </button>
              </li>
            )}
          </ul>
          {showAllContraindications && (
            <>
              <ul className="text-sm text-mama-dark-text list-disc pl-5 mb-2">
                {defaultContraindications.slice(3).map((contraindication, index) => (
                  <li key={index + 3}>{contraindication}</li>
                ))}
              </ul>
              <button 
                className="text-sm text-mama-dark-text font-medium underline hover:no-underline"
                onClick={() => setShowAllContraindications(false)}
              >
                Show less
              </button>
            </>
          )}
          <p className="text-sm text-mama-dark-text mt-2">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthNotice;