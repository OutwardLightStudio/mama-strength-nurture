
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const SignupForm: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [childAge, setChildAge] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ageRanges = [
    { value: '0-3', label: '0-3 months' },
    { value: '3-6', label: '3-6 months' },
    { value: '6-12', label: '6-12 months' },
    { value: '12+', label: '12+ months' },
  ];

  const challengeOptions = [
    { value: 'time', label: 'Time constraints' },
    { value: 'physical', label: 'Physical limitations' },
    { value: 'engagement', label: 'Keeping baby engaged' },
    { value: 'energy', label: 'Low energy/motivation' },
    { value: 'guidance', label: 'Need for expert guidance' },
  ];

  const handleChallengeToggle = (value: string) => {
    if (challenges.includes(value)) {
      setChallenges(challenges.filter(c => c !== value));
    } else {
      setChallenges([...challenges, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-mama-dark-text mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-mama-beige focus:border-mama-pink focus:ring focus:ring-mama-pink focus:ring-opacity-30 transition-all outline-none"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-mama-dark-text mb-1">
          Child's age range
        </label>
        <select
          value={childAge}
          onChange={(e) => setChildAge(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-mama-beige focus:border-mama-pink focus:ring focus:ring-mama-pink focus:ring-opacity-30 transition-all outline-none"
        >
          <option value="" disabled>Select age range</option>
          {ageRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <span className="block text-sm font-medium text-mama-dark-text mb-1">
          Top challenges (select all that apply)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {challengeOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                challenges.includes(option.value)
                  ? 'border-mama-pink bg-mama-light-pink'
                  : 'border-mama-beige hover:border-mama-pink'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={challenges.includes(option.value)}
                onChange={() => handleChallengeToggle(option.value)}
              />
              <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${
                challenges.includes(option.value)
                  ? 'bg-mama-pink border-mama-pink'
                  : 'border-mama-light-text'
              }`}>
                {challenges.includes(option.value) && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary mt-4 relative"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Join the waitlist"
        )}
      </button>
      
      <p className="text-xs text-center text-mama-light-text mt-4">
        By signing up, you'll receive updates about our launch and early access opportunities.
      </p>
    </form>
  );
};

export default SignupForm;
