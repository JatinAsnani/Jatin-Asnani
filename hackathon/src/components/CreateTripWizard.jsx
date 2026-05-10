import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Heart, Wallet, Sparkles } from 'lucide-react';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Destinations from './steps/Step2Destinations';
import Step3Preferences from './steps/Step3Preferences';
import Step4Budget from './steps/Step4Budget';
import Step5Review from './steps/Step5Review';

const steps = [
  { id: 1, title: 'Basics', icon: Plane },
  { id: 2, title: 'Destinations', icon: MapPin },
  { id: 3, title: 'Preferences', icon: Heart },
  { id: 4, title: 'Budget', icon: Wallet },
  { id: 5, title: 'Review', icon: Sparkles },
];

export default function CreateTripWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    name: '',
    description: '',
    dates: '',
    destinations: [],
    preferences: [],
    moodPrompt: '',
    budget: 5000,
    travelers: 2,
  });

  const updateTripData = (data) => {
    setTripData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo data={tripData} updateData={updateTripData} onNext={handleNext} />;
      case 2:
        return <Step2Destinations data={tripData} updateData={updateTripData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Preferences data={tripData} updateData={updateTripData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Budget data={tripData} updateData={updateTripData} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5Review data={tripData} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto py-8 px-6 lg:px-12 z-10 relative">
      
      {/* Progress Tracker */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 z-0"></div>
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#EA7B7B] to-[#9E3B3B] z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          ></motion.div>

          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-black border-[#EA7B7B] text-[#EA7B7B] shadow-[0_0_20px_rgba(234,123,123,0.4)]' 
                      : isCompleted 
                        ? 'bg-[#EA7B7B] border-[#EA7B7B] text-white'
                        : 'bg-[#111] border-white/20 text-white/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span className={`text-xs font-medium tracking-wide ${isActive ? 'text-white' : 'text-white/50'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content with AnimatePresence */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
