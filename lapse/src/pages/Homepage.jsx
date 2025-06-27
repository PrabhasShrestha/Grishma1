import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Clock, Users, BarChart3, Bell, ArrowRight, Star, Zap, Play } from 'lucide-react';


const LapseLanding = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Lapse transformed how I manage my daily tasks. The Kanban board is intuitive and the time tracking helps me stay productive.",
      author: "Sarah Chen",
      role: "Freelance Designer",
      avatar: "SC"
    },
    {
      text: "Finally, a task manager that doesn't overwhelm me with features I don't need. Clean, simple, and effective.",
      author: "Marcus Johnson",
      role: "Student",
      avatar: "MJ"
    },
    {
      text: "The team collaboration features are perfect for our small startup. We've increased our productivity by 40%.",
      author: "Elena Rodriguez",
      role: "Startup Founder",
      avatar: "ER"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Kanban Board View",
      description: "Drag-and-drop interface with To-Do, In Progress, and Done columns for visual task management."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Tracking",
      description: "Monitor time spent on tasks to improve productivity and gain valuable insights."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Calendar Integration",
      description: "View tasks in monthly or weekly calendar format for better timeline management."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track progress across your workspace."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get timely reminders and alerts to never miss important deadlines."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Track completion rates and productivity with insightful dashboard analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
  
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Organize. Prioritize. Achieve.
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Task Management
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform chaos into clarity with Lapse. A beautiful, intuitive task management app 
              designed to help you prioritize what matters most and achieve your goals with less stress.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to stay
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                organized and productive
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your workflow and boost your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple steps to
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                organized success
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Tasks",
                description: "Add tasks with descriptions, priorities, and deadlines. Organize them with custom labels and categories."
              },
              {
                step: "02",
                title: "Track Progress",
                description: "Use our intuitive Kanban board to move tasks through To-Do, In Progress, and Done columns."
              },
              {
                step: "03",
                title: "Achieve Your Goals",
                description: "Monitor your productivity with analytics, time tracking, and smart notifications to stay on track."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> thousands</span>
            </h2>
            <p className="text-xl text-slate-600">See what our users say about Lapse</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-slate-700 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">{testimonials[currentTestimonial].author}</div>
                  <div className="text-slate-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Start organizing your life with Lapse today - completely free
          </p>
        </div>
      </section>


    </div>
  );
};

export default LapseLanding;