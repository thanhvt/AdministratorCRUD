import { LoginButton } from '../../components/auth/login-button';
import { Logo } from '../../components/layout/logo';
import { Leaf, Globe, Users, Heart, ArrowRight, Play } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 overflow-hidden">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-100">
                EcoNest
              </h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-green-700 dark:text-green-200 hover:text-green-600 dark:hover:text-green-100 font-medium transition-colors">
              Home
            </a>
            <a href="#about" className="text-green-700 dark:text-green-200 hover:text-green-600 dark:hover:text-green-100 font-medium transition-colors">
              About
            </a>
            <a href="#mission" className="text-green-700 dark:text-green-200 hover:text-green-600 dark:hover:text-green-100 font-medium transition-colors">
              Our Mission
            </a>
            <a href="#stories" className="text-green-700 dark:text-green-200 hover:text-green-600 dark:hover:text-green-100 font-medium transition-colors">
              Success Stories
            </a>
            <LoginButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-transparent z-10" />
        {/* Simulated nature background - hands protecting plant */}
        <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-green-100 to-transparent dark:from-green-800 dark:to-transparent">
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-30 dark:opacity-20">
            <div className="relative w-full h-full">
              {/* Stylized hands and plant illustration */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-t from-green-600 to-green-400 rounded-full opacity-60" />
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-green-700 rounded-full" />
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 -translate-y-2 w-8 h-8 bg-green-500 rounded-full" />
              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 -translate-y-4 w-6 h-6 bg-green-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-1000 opacity-60" />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-teal-400 rounded-full animate-bounce delay-2000 opacity-60" />

      {/* Main Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-800/30 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium">
                <Leaf className="w-4 h-4" />
                Welcome To EcoNest
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Join the Movement
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  to Heal Our Planet
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Your actions today can create a sustainable tomorrow. Together, we can restore nature, combat climate change, and protect wildlife.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 font-semibold rounded-xl transition-all duration-200 hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-3xl p-8 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Globe className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Make a Difference Today
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of environmental advocates working together for a sustainable future.
                </p>
                <div className="pt-4">
                  <LoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact Areas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We focus on key environmental challenges where collective action can make the biggest difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Climate Action</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Combat climate change through renewable energy initiatives and carbon reduction programs.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Wildlife Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Protect endangered species and preserve natural habitats for future generations.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Community Building</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build sustainable communities through education, awareness, and local environmental projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo />
                <h3 className="text-2xl font-bold">EcoNest</h3>
              </div>
              <p className="text-gray-400">
                Building a sustainable future through collective environmental action.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#mission" className="hover:text-green-400 transition-colors">Our Mission</a></li>
                <li><a href="#projects" className="hover:text-green-400 transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#volunteer" className="hover:text-green-400 transition-colors">Volunteer</a></li>
                <li><a href="#donate" className="hover:text-green-400 transition-colors">Donate</a></li>
                <li><a href="#events" className="hover:text-green-400 transition-colors">Events</a></li>
                <li><a href="#newsletter" className="hover:text-green-400 transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoNest. All rights reserved. Together for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
