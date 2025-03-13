
import React from 'react';
import { Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-white border-t border-mama-beige">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-mama-dark-text">MamaStrong</h2>
            <p className="text-mama-light-text mt-1">Strength & connection for mothers</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              Exercises
            </a>
            <a href="#" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              About Us
            </a>
            <a href="#" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              Contact
            </a>
            <a href="#" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              FAQ
            </a>
          </div>
        </div>
        
        <div className="border-t border-mama-beige pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-mama-light-text mb-4 md:mb-0">
            © 2023 MamaStrong. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-mama-light-text hover:text-mama-pink transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-mama-light-text hover:text-mama-pink transition-colors">
              Terms of Service
            </a>
            <a 
              href="mailto:contact@mamastrong.com" 
              className="flex items-center gap-1 text-mama-light-text hover:text-mama-pink transition-colors"
            >
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-mama-light-text flex items-center justify-center">
          <span>Made with</span>
          <Heart size={14} className="text-mama-pink mx-1" />
          <span>for mothers everywhere</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
