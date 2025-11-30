import { useState } from 'react';
import { Sparkles, Brain, Users, BookOpen, Heart, Zap, Target, Award, Flame, Crown, Eye, Compass } from 'lucide-react';

const API_URL = 'https://mbti_predictor_backend.onrender.com';

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    education: '0',
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
      color: 'from-amber-500 via-yellow-400 to-amber-600',
      icon: Crown,
      accent: 'text-amber-400'
    },
    'INTJ': { 
      title: 'The Mastermind', 
      desc: 'Analytical problem-solvers, eager to improve systems',
      color: 'from-yellow-400 via-amber-500 to-yellow-500',
      icon: Brain,
      accent: 'text-yellow-400'
    },
    'ENTP': { 
      title: 'The Visionary', 
      desc: 'Inspired innovators, seeking new solutions',
      color: 'from-amber-400 via-yellow-500 to-amber-500',
      icon: Eye,
      accent: 'text-amber-400'
    },
    'INTP': { 
      title: 'The Architect', 
      desc: 'Philosophical innovators, fascinated by logical analysis',
      color: 'from-yellow-500 via-amber-400 to-yellow-600',
      icon: Compass,
      accent: 'text-yellow-500'
    },
    'ENFJ': { 
      title: 'The Teacher', 
      desc: 'Idealist organizers, driven to help humanity',
      color: 'from-yellow-400 via-amber-400 to-yellow-500',
      icon: Users,
      accent: 'text-yellow-400'
    },
    'INFJ': { 
      title: 'The Counselor', 
      desc: 'Creative nurturers, driven by personal integrity',
      color: 'from-amber-500 via-yellow-400 to-amber-400',
      icon: Heart,
      accent: 'text-amber-500'
    },
    'ENFP': { 
      title: 'The Champion', 
      desc: 'People-centered creators, motivated by possibilities',
      color: 'from-yellow-500 via-amber-400 to-yellow-400',
      icon: Flame,
      accent: 'text-yellow-500'
    },
    'INFP': { 
      title: 'The Healer', 
      desc: 'Imaginative idealists, guided by values and beliefs',
      color: 'from-yellow-400 via-yellow-500 to-amber-600',
      icon: Heart,
      accent: 'text-yellow-400'
    },
    'ESTJ': { 
      title: 'The Supervisor', 
      desc: 'Hardworking traditionalists, taking charge',
      color: 'from-amber-400 via-yellow-500 to-amber-500',
      icon: Target,
      accent: 'text-amber-400'
    },
    'ISTJ': { 
      title: 'The Inspector', 
      desc: 'Responsible organizers, creating order from chaos',
      color: 'from-yellow-500 via-amber-500 to-yellow-400',
      icon: BookOpen,
      accent: 'text-yellow-500'
    },
    'ESFJ': { 
      title: 'The Provider', 
      desc: 'Conscientious helpers, dedicated to duties',
      color: 'from-yellow-400 via-amber-500 to-amber-400',
      icon: Users,
      accent: 'text-yellow-400'
    },
    'ISFJ': { 
      title: 'The Protector', 
      desc: 'Industrious caretakers, loyal to traditions',
      color: 'from-amber-500 via-yellow-500 to-amber-600',
      icon: Heart,
      accent: 'text-amber-500'
    },
    'ESTP': { 
      title: 'The Dynamo', 
      desc: 'Energetic thrillseekers, ready for action',
      color: 'from-yellow-500 via-amber-400 to-yellow-500',
      icon: Zap,
      accent: 'text-yellow-500'
    },
    'ISTP': { 
      title: 'The Craftsperson', 
      desc: 'Observant troubleshooters, solving practical problems',
      color: 'from-yellow-400 via-amber-500 to-yellow-600',
      icon: Target,
      accent: 'text-yellow-400'
    },
    'ESFP': { 
      title: 'The Entertainer', 
      desc: 'Vivacious entertainers, loving life and charming others',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      icon: Sparkles,
      accent: 'text-amber-400'
    },
    'ISFP': { 
      title: 'The Composer', 
      desc: 'Gentle caretakers, enjoying the moment',
      color: 'from-yellow-500 via-yellow-400 to-amber-500',
      icon: Heart,
      accent: 'text-yellow-500'
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
          <label className="block text-sm font-semibold text-gray-300 tracking-wide">AGE</label>
          <input
            type="number"
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-5 py-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-all duration-300"
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
          <label className="block text-sm font-semibold text-gray-300 tracking-wide">GENDER</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-5 py-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white focus:border-yellow-500 focus:outline-none transition-all duration-300"
          >
            <option value="" className="bg-gray-800">Select gender</option>
            <option value="Male" className="bg-gray-800">Male</option>
            <option value="Female" className="bg-gray-800">Female</option>
            <option value="Other" className="bg-gray-800">Other</option>
          </select>
        </div>
      );
    }
    
    if (field === 'education') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300 tracking-wide">EDUCATION</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-5 py-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white focus:border-yellow-500 focus:outline-none transition-colors"
          >
            <option value="">Select education level</option>
            <option value="0" className="bg-gray-800">High School</option>
            <option value="1" className="bg-gray-800">Bachelor's or Higher</option>
          </select>
        </div>
      );
    }
    
    if (field === 'interest') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300 tracking-wide">PRIMARY INTEREST</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            className="w-full px-5 py-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white focus:border-yellow-500 focus:outline-none transition-colors"
          >
            <option value="" className="bg-gray-800">Select interest</option>
            <option value="Technology" className="bg-gray-800">Technology</option>
            <option value="Arts" className="bg-gray-800">Arts</option>
            <option value="Science" className="bg-gray-800">Science</option>
            <option value="Sports" className="bg-gray-800">Sports</option>
            <option value="Business" className="bg-gray-800">Business</option>
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
      <div key={field} className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            {labels[field][0]} <span className="text-yellow-500 mx-2">→</span> {labels[field][1]}
          </label>
          <span className="text-lg font-bold text-yellow-400 bg-gray-800 px-4 py-1 rounded-lg border border-gray-700">{formData[field]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={formData[field]}
          onChange={(e) => setFormData({...formData, [field]: parseFloat(e.target.value)})}
          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-dark"
        />
        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider font-medium">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-2xl w-full relative z-10">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-800 animate-fadeIn">
            <div className={`bg-gradient-to-r ${mbtiInfo.color} p-10 text-gray-900 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="transform hover:scale-110 transition-transform duration-300 bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
                    <Icon className="w-16 h-16" strokeWidth={2.5} />
                  </div>
                </div>
                <h1 className="text-5xl font-black text-center mb-3 tracking-tight">{result.type}</h1>
                <h2 className="text-2xl font-bold text-center mb-2 tracking-wide">{mbtiInfo.title}</h2>
                <p className="text-center text-gray-900/80 font-medium">{mbtiInfo.desc}</p>
              </div>
            </div>
            
            <div className="p-10 bg-gray-900">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-yellow-400 uppercase tracking-wider">
                <Award className="w-6 h-6" />
                Personality Match Analysis
              </h3>
              <div className="space-y-4">
                {result.probabilities.map(([type, prob], idx) => (
                  <div key={type} className="flex items-center gap-4 animate-countUp bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm" style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="w-12 text-sm font-black text-yellow-400">#{idx + 1}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-white tracking-wide">{type}</span>
                        <span className="text-sm font-bold text-yellow-400">{(prob * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden border border-gray-600">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${mbtiDescriptions[type].color} transition-all duration-1000 shadow-lg`}
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
                    education: '0',
                    interest: '',
                    introversion: 5,
                    sensing: 5,
                    thinking: 5,
                    judging: 5
                  });
                }}
                className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 py-5 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all border-2 border-yellow-400"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              <Brain className="relative w-20 h-20 text-yellow-400 drop-shadow-2xl" strokeWidth={2} />
              <Sparkles className="w-7 h-7 text-amber-400 absolute -top-2 -right-2 animate-twinkle" />
            </div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 tracking-tight">
            MBTI PREDICTOR
          </h1>
          <p className="text-gray-400 text-lg font-medium tracking-wide">Neural Analysis of Personality Patterns</p>
        </div>

        <div className="bg-gray-900 rounded-3xl shadow-2xl p-10 animate-slideUp border-2 border-gray-800 backdrop-blur-xl">
          <div className="mb-10">
            <div className="flex justify-between mb-4">
              {steps.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all duration-500 transform ${
                    idx <= step ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-110 shadow-lg shadow-yellow-500/50' : 'bg-gray-800 text-gray-600 scale-100 border-2 border-gray-700'
                  } ${idx === step ? 'ring-4 ring-yellow-500/30' : ''}`}>
                    {idx + 1}
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${idx <= step ? 'text-yellow-400' : 'text-gray-600'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
              <div 
                className="h-3 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 rounded-full transition-all duration-700"
                style={{width: `${((step + 1) / steps.length) * 100}%`}}
              />
            </div>
          </div>

          <div className="space-y-8 mb-10 animate-fadeIn">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
              {steps[step].title}
              <Sparkles className="w-6 h-6 text-yellow-400 animate-twinkle" />
            </h2>
            {steps[step].fields.map(field => renderField(field))}
          </div>

          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-800 text-gray-300 py-5 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-700 transition-all border-2 border-gray-700"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 py-5 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all border-2 border-yellow-400"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={predictMBTI}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 py-5 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-400"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Analyzing Neural Patterns...
                  </span>
                ) : (
                  'Generate Analysis'
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8 uppercase tracking-widest font-bold">
          Random Forest ML • Real-time Analysis
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.4; transform: scale(1.3) rotate(180deg); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-twinkle {
          animation: twinkle 2.5s ease-in-out infinite;
        }
        .animate-countUp {
          animation: countUp 0.6s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .slider-dark::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border: 2px solid #fcd34d;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          transition: all 0.3s;
        }
        .slider-dark::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
        }
        .slider-dark::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border: 2px solid #fcd34d;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          transition: all 0.3s;
        }
        .slider-dark::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
        }
      `}</style>
    </div>
  );
}