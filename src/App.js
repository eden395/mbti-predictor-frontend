import { useState } from 'react';
import { Sparkles, Brain, Users, BookOpen, Heart, Zap, Target, Award } from 'lucide-react';

const API_URL = 'https://mbti-predictor-backend.onrender.com';

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    education: '',
    interest: '',
    introversion: 5,
    sensing: 5,
    thinking: 5,
    judging: 5
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const mbtiDescriptions = {
    'ENTJ': { 
      title: 'The Commander', 
      desc: 'Strategic leaders, motivated to organize change',
      color: 'from-yellow-500 via-amber-400 to-yellow-600',
      icon: Target
    },
    'INTJ': { 
      title: 'The Mastermind', 
      desc: 'Analytical problem-solvers, eager to improve systems',
      color: 'from-yellow-400 via-yellow-500 to-amber-500',
      icon: Brain
    },
    'ENTP': { 
      title: 'The Visionary', 
      desc: 'Inspired innovators, seeking new solutions',
      color: 'from-amber-400 via-yellow-500 to-yellow-400',
      icon: Sparkles
    },
    'INTP': { 
      title: 'The Architect', 
      desc: 'Philosophical innovators, fascinated by logical analysis',
      color: 'from-yellow-500 via-amber-500 to-yellow-600',
      icon: Brain
    },
    'ENFJ': { 
      title: 'The Teacher', 
      desc: 'Idealist organizers, driven to help humanity',
      color: 'from-yellow-400 via-yellow-500 to-amber-400',
      icon: Users
    },
    'INFJ': { 
      title: 'The Counselor', 
      desc: 'Creative nurturers, driven by personal integrity',
      color: 'from-amber-500 via-yellow-400 to-yellow-500',
      icon: Heart
    },
    'ENFP': { 
      title: 'The Champion', 
      desc: 'People-centered creators, motivated by possibilities',
      color: 'from-yellow-500 via-amber-400 to-yellow-500',
      icon: Sparkles
    },
    'INFP': { 
      title: 'The Healer', 
      desc: 'Imaginative idealists, guided by values and beliefs',
      color: 'from-yellow-400 via-yellow-500 to-amber-600',
      icon: Heart
    },
    'ESTJ': { 
      title: 'The Supervisor', 
      desc: 'Hardworking traditionalists, taking charge',
      color: 'from-amber-400 via-yellow-500 to-yellow-400',
      icon: Target
    },
    'ISTJ': { 
      title: 'The Inspector', 
      desc: 'Responsible organizers, creating order from chaos',
      color: 'from-yellow-500 via-amber-500 to-yellow-400',
      icon: BookOpen
    },
    'ESFJ': { 
      title: 'The Provider', 
      desc: 'Conscientious helpers, dedicated to duties',
      color: 'from-yellow-400 via-yellow-600 to-amber-500',
      icon: Users
    },
    'ISFJ': { 
      title: 'The Protector', 
      desc: 'Industrious caretakers, loyal to traditions',
      color: 'from-amber-500 via-yellow-500 to-yellow-600',
      icon: Heart
    },
    'ESTP': { 
      title: 'The Dynamo', 
      desc: 'Energetic thrillseekers, ready for action',
      color: 'from-yellow-500 via-amber-400 to-yellow-400',
      icon: Zap
    },
    'ISTP': { 
      title: 'The Craftsperson', 
      desc: 'Observant troubleshooters, solving practical problems',
      color: 'from-yellow-400 via-yellow-500 to-amber-500',
      icon: Target
    },
    'ESFP': { 
      title: 'The Entertainer', 
      desc: 'Vivacious entertainers, loving life and charming others',
      color: 'from-amber-400 via-yellow-500 to-yellow-600',
      icon: Sparkles
    },
    'ISFP': { 
      title: 'The Composer', 
      desc: 'Gentle caretakers, enjoying the moment',
      color: 'from-yellow-500 via-yellow-400 to-amber-500',
      icon: Heart
    }
  };

  const predictMBTI = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult({
          type: data.predicted_type,
          probabilities: Object.entries(data.probabilities)
        });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to connect to server: ' + error.message);
    }
    
    setLoading(false);
  };

  const steps = [
    {
      title: "Personal Info",
      fields: ['age', 'gender', 'education', 'interest']
    },
    {
      title: "Personality Traits",
      fields: ['introversion', 'sensing', 'thinking', 'judging']
    }
  ];

  const renderField = (field) => {
    if (field === 'age') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-300 focus:scale-105"
            placeholder="Enter your age"
            min="10"
            max="100"
          />
        </div>
      );
    }
    
    if (field === 'gender') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-300 focus:scale-105"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      );
    }
    
    if (field === 'education') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      );
    }
    
    if (field === 'interest') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Primary Interest</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">Select interest</option>
            <option value="Technology">Technology</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
          </select>
        </div>
      );
    }
    
    const labels = {
      introversion: ['Extroverted', 'Introverted'],
      sensing: ['Intuitive', 'Sensing'],
      thinking: ['Feeling', 'Thinking'],
      judging: ['Perceiving', 'Judging']
    };
    
    return (
      <div key={field} className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 capitalize">
            {labels[field][0]} vs {labels[field][1]}
          </label>
          <span className="text-sm font-bold text-purple-600">{formData[field]}/10</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={formData[field]}
          onChange={(e) => setFormData({...formData, [field]: parseFloat(e.target.value)})}
          className="w-full h-2 bg-gradient-to-r from-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{labels[field][0]}</span>
          <span>{labels[field][1]}</span>
        </div>
      </div>
    );
  };

  if (result) {
    const mbtiInfo = mbtiDescriptions[result.type];
    const Icon = mbtiInfo.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className={`bg-gradient-to-r ${mbtiInfo.color} p-8 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <Icon className="w-16 h-16" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-center mb-2 animate-pulse">{result.type}</h1>
                <h2 className="text-2xl text-center mb-2">{mbtiInfo.title}</h2>
                <p className="text-center text-white/90">{mbtiInfo.desc}</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                Top Personality Matches
              </h3>
              <div className="space-y-3">
                {result.probabilities.map(([type, prob], idx) => (
                  <div key={type} className="flex items-center gap-3 animate-countUp" style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="w-16 text-sm font-bold text-gray-600">#{idx + 1}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{type}</span>
                        <span className="text-sm text-gray-600">{(prob * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${mbtiDescriptions[type].color} transition-all duration-1000`}
                          style={{width: `${prob * 100}%`}}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setResult(null);
                  setStep(0);
                  setFormData({
                    age: '',
                    gender: '',
                    education: '',
                    interest: '',
                    introversion: 5,
                    sensing: 5,
                    thinking: 5,
                    judging: 5
                  });
                }}
                className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Take Test Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Brain className="w-16 h-16 text-purple-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-pink-500 absolute -top-1 -right-1 animate-twinkle" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            MBTI Predictor
          </h1>
          <p className="text-gray-600">Discover your personality type with AI-powered analysis</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slideUp hover:shadow-3xl transition-shadow duration-300">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-500 transform ${
                    idx <= step ? 'bg-purple-500 text-white scale-110' : 'bg-gray-200 text-gray-500 scale-100'
                  } ${idx === step ? 'ring-4 ring-purple-200' : ''}`}>
                    {idx + 1}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${idx <= step ? 'text-purple-600' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-700 animate-shimmer"
                style={{width: `${((step + 1) / steps.length) * 100}%`}}
              />
            </div>
          </div>

          <div className="space-y-6 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {steps[step].title}
              <Sparkles className="w-5 h-5 text-purple-500 animate-twinkle" />
            </h2>
            {steps[step].fields.map(field => renderField(field))}
          </div>

          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={predictMBTI}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  'Get My Result'
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Powered by Random Forest ML Model • Real-time predictions
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.5; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
        .animate-countUp {
          animation: countUp 0.5s ease-out;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid #a855f7;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(168, 85, 247, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid #a855f7;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
}