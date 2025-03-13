import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-mama-dark-text">
            <span className="text-xl font-semibold">MamaStrong</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/exercises" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              Exercises
            </Link>
            <Link to="/quick-pick" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              Quick Pick
            </Link>
            <Link to="/schedule" className="text-mama-dark-text hover:text-mama-pink transition-colors">
              Schedule
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn-primary">
                  Sign Up
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-2xl shadow-medium max-w-md w-full p-6 animate-fade-in-up">
                <DialogTitle className="heading-sm mb-4">Join the MamaStrong community</DialogTitle>
                <SignupForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-mama-dark-text focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-medium p-4 rounded-b-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/exercises" 
                className="text-mama-dark-text hover:text-mama-pink transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Exercises
              </Link>
              <Link 
                to="/quick-pick" 
                className="text-mama-dark-text hover:text-mama-pink transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quick Pick
              </Link>
              <Link 
                to="/schedule" 
                className="text-mama-dark-text hover:text-mama-pink transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="btn-primary self-start">
                    Sign Up
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-2xl shadow-medium max-w-md w-full p-6 animate-fade-in-up">
                  <DialogTitle className="heading-sm mb-4">Join the MamaStrong community</DialogTitle>
                  <SignupForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
