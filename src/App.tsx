import React, { useState } from 'react';
import { ArrowRight, Monitor, Smartphone, AppWindow as Windows, Zap as Linux, Apple, Battery, Wifi, AlertCircle, Gauge, Eye, Power } from 'lucide-react';

interface FlowState {
  step: number;
  deviceType: string;
  operatingSystem: string;
  problem: string;
}

function App() {
  const [flowState, setFlowState] = useState<FlowState>({
    step: 1,
    deviceType: '',
    operatingSystem: '',
    problem: ''
  });

  const handleDeviceSelection = (device: string) => {
    setFlowState(prev => ({
      ...prev,
      deviceType: device,
      step: 2,
      operatingSystem: '',
      problem: ''
    }));
  };

  const handleOSSelection = (os: string) => {
    setFlowState(prev => ({
      ...prev,
      operatingSystem: os,
      step: 3,
      problem: ''
    }));
  };

  const handleProblemSelection = (problem: string) => {
    setFlowState(prev => ({
      ...prev,
      problem: problem,
      step: 4
    }));
  };

  const goBack = () => {
    if (flowState.step === 2) {
      setFlowState(prev => ({ ...prev, step: 1, deviceType: '', operatingSystem: '', problem: '' }));
    } else if (flowState.step === 3) {
      setFlowState(prev => ({ ...prev, step: 2, operatingSystem: '', problem: '' }));
    } else if (flowState.step === 4) {
      setFlowState(prev => ({ ...prev, step: 3, problem: '' }));
    }
  };

  const restart = () => {
    setFlowState({
      step: 1,
      deviceType: '',
      operatingSystem: '',
      problem: ''
    });
  };

  const getProgressWidth = () => {
    return `${(flowState.step / 4) * 100}%`;
  };

  const getDeviceLabel = (device: string) => {
    return device === 'computer' ? 'الكمبيوتر' : 'الهاتف المحمول';
  };

  const getOSLabel = (os: string) => {
    const labels: { [key: string]: string } = {
      'windows': 'ويندوز',
      'linux': 'لينكس',
      'android': 'أندرويد',
      'ios': 'آي أو إس'
    };
    return labels[os] || os;
  };

  const getProblemLabel = (problem: string) => {
    const labels: { [key: string]: string } = {
      'slow_performance': 'أداء بطيء',
      'screen_issue': 'مشكلة في الشاشة',
      'not_working': 'لا يعمل',
      'battery': 'البطارية',
      'screen': 'الشاشة',
      'network': 'الشبكة'
    };
    return labels[problem] || problem;
  };

  const OptionButton = ({ 
    icon: Icon, 
    label, 
    onClick, 
    delay = 0 
  }: { 
    icon: React.ComponentType<any>, 
    label: string, 
    onClick: () => void, 
    delay?: number 
  }) => (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 animate-slideIn`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
          <Icon size={32} className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
        </div>
        <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            مساعد الدعم التقني
          </h1>
          <p className="text-center text-gray-600 text-lg">
            دعنا نساعدك في العثور على الحل المناسب لجهازك
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: getProgressWidth() }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>البداية</span>
            <span>{Math.round((flowState.step / 4) * 100)}% مكتمل</span>
            <span>الحل</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          
          {/* Step 1: Device Type */}
          {flowState.step === 1 && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ما نوع الجهاز الذي تستخدمه؟
              </h2>
              <p className="text-gray-600 mb-12 text-lg">
                اختر الجهاز الذي تواجه مشكلة معه
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <OptionButton
                  icon={Monitor}
                  label="كمبيوتر"
                  onClick={() => handleDeviceSelection('computer')}
                  delay={100}
                />
                <OptionButton
                  icon={Smartphone}
                  label="هاتف محمول"
                  onClick={() => handleDeviceSelection('mobile')}
                  delay={200}
                />
              </div>
            </div>
          )}

          {/* Step 2: Operating System */}
          {flowState.step === 2 && (
            <div className="text-center animate-fadeIn">
              <button
                onClick={goBack}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group transition-colors duration-200"
              >
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                العودة لاختيار الجهاز
              </button>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ما نظام التشغيل الذي تستخدمه؟
              </h2>
              <p className="text-gray-600 mb-12 text-lg">
                اختر نظام تشغيل {getDeviceLabel(flowState.deviceType)}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {flowState.deviceType === 'computer' ? (
                  <>
                    <OptionButton
                      icon={Windows}
                      label="ويندوز"
                      onClick={() => handleOSSelection('windows')}
                      delay={100}
                    />
                    <OptionButton
                      icon={Linux}
                      label="لينكس"
                      onClick={() => handleOSSelection('linux')}
                      delay={200}
                    />
                  </>
                ) : (
                  <>
                    <OptionButton
                      icon={AndroidIcon}
                      label="أندرويد"
                      onClick={() => handleOSSelection('android')}
                      delay={100}
                    />
                    <OptionButton
                      icon={Apple}
                      label="آي أو إس"
                      onClick={() => handleOSSelection('ios')}
                      delay={200}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Problem Selection */}
          {flowState.step === 3 && (
            <div className="text-center animate-fadeIn">
              <button
                onClick={goBack}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group transition-colors duration-200"
              >
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                العودة لاختيار نظام التشغيل
              </button>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ما المشكلة التي تواجهها؟
              </h2>
              <p className="text-gray-600 mb-12 text-lg">
                صف المشكلة في {getDeviceLabel(flowState.deviceType)}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {flowState.deviceType === 'computer' ? (
                  <>
                    <OptionButton
                      icon={Gauge}
                      label="أداء بطيء"
                      onClick={() => handleProblemSelection('slow_performance')}
                      delay={100}
                    />
                    <OptionButton
                      icon={Eye}
                      label="مشكلة في الشاشة"
                      onClick={() => handleProblemSelection('screen_issue')}
                      delay={200}
                    />
                    <OptionButton
                      icon={Power}
                      label="لا يعمل"
                      onClick={() => handleProblemSelection('not_working')}
                      delay={300}
                    />
                  </>
                ) : (
                  <>
                    <OptionButton
                      icon={Battery}
                      label="البطارية"
                      onClick={() => handleProblemSelection('battery')}
                      delay={100}
                    />
                    <OptionButton
                      icon={Eye}
                      label="الشاشة"
                      onClick={() => handleProblemSelection('screen')}
                      delay={200}
                    />
                    <OptionButton
                      icon={Wifi}
                      label="الشبكة"
                      onClick={() => handleProblemSelection('network')}
                      delay={300}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {flowState.step === 4 && (
            <div className="text-center animate-fadeIn">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} className="text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  تم العثور على الحل!
                </h2>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">اختياراتك:</h3>
                  <div className="space-y-2 text-right">
                    <div className="flex justify-between">
                      <span className="font-medium">{getDeviceLabel(flowState.deviceType)}</span>
                      <span className="text-gray-600">:الجهاز</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">{getOSLabel(flowState.operatingSystem)}</span>
                      <span className="text-gray-600">:نظام التشغيل</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">{getProblemLabel(flowState.problem)}</span>
                      <span className="text-gray-600">:المشكلة</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8 text-lg">
                  بناءً على اختياراتك، تمكنا من تحديد أفضل خطوات استكشاف الأخطاء وإصلاحها لمشكلتك المحددة.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={restart}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ابدأ من جديد
                  </button>
                  <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                    احصل على الدعم
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 text-center text-gray-500">
        <p>تحتاج مساعدة إضافية؟ تواصل مع فريق الدعم في أي وقت.</p>
      </footer>
    </div>
  );
}

export default App;