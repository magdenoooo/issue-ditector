import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, AppWindow as Windows, Zap as Linux, Apple, Battery, Wifi, AlertCircle, Gauge, Eye, Power, FileText, Copyright } from 'lucide-react';

// Android icon component
const AndroidIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

interface FlowState {
  deviceType: string;
  operatingSystem: string;
  problem: string;
}

function App() {
  const [flowState, setFlowState] = useState<FlowState>({
    deviceType: '',
    operatingSystem: '',
    problem: ''
  });

  const [availableOS, setAvailableOS] = useState<string[]>([]);
  const [availableProblems, setAvailableProblems] = useState<string[]>([]);

  // Update available options when device type changes
  useEffect(() => {
    if (flowState.deviceType === 'computer') {
      setAvailableOS(['windows', 'linux']);
      setAvailableProblems(['slow_performance', 'screen_issue', 'not_working']);
    } else if (flowState.deviceType === 'mobile') {
      setAvailableOS(['android', 'ios']);
      setAvailableProblems(['battery', 'screen', 'network']);
    } else {
      setAvailableOS([]);
      setAvailableProblems([]);
    }
    
    // Reset dependent selections when device changes
    if (flowState.operatingSystem && !availableOS.includes(flowState.operatingSystem)) {
      setFlowState(prev => ({ ...prev, operatingSystem: '', problem: '' }));
    }
  }, [flowState.deviceType, availableOS]);

  // Reset problem when OS changes
  useEffect(() => {
    if (flowState.operatingSystem && flowState.problem && !availableProblems.includes(flowState.problem)) {
      setFlowState(prev => ({ ...prev, problem: '' }));
    }
  }, [flowState.operatingSystem, availableProblems, flowState.problem]);

  const handleDeviceSelection = (device: string) => {
    setFlowState(prev => ({
      ...prev,
      deviceType: device,
      operatingSystem: '',
      problem: ''
    }));
  };

  const handleOSSelection = (os: string) => {
    setFlowState(prev => ({
      ...prev,
      operatingSystem: os,
      problem: ''
    }));
  };

  const handleProblemSelection = (problem: string) => {
    setFlowState(prev => ({
      ...prev,
      problem: problem
    }));
  };

  const restart = () => {
    setFlowState({
      deviceType: '',
      operatingSystem: '',
      problem: ''
    });
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
    isSelected = false,
    isDisabled = false,
    delay = 0 
  }: { 
    icon: React.ComponentType<any>, 
    label: string, 
    onClick: () => void, 
    isSelected?: boolean,
    isDisabled?: boolean,
    delay?: number 
  }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group relative overflow-hidden rounded-2xl p-6 shadow-lg border transition-all duration-500 ease-out transform hover:scale-105 animate-slideIn ${
        isSelected 
          ? 'bg-blue-600 border-blue-700 text-white shadow-blue-200' 
          : isDisabled
          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className={`p-3 rounded-full transition-all duration-300 ${
          isSelected 
            ? 'bg-white/20' 
            : isDisabled
            ? 'bg-gray-200'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100'
        }`}>
          <Icon size={28} className={`transition-colors duration-300 ${
            isSelected 
              ? 'text-white' 
              : isDisabled
              ? 'text-gray-400'
              : 'text-blue-600 group-hover:text-blue-700'
          }`} />
        </div>
        <span className={`text-base font-semibold transition-colors duration-300 ${
          isSelected 
            ? 'text-white' 
            : isDisabled
            ? 'text-gray-400'
            : 'text-gray-800 group-hover:text-blue-900'
        }`}>
          {label}
        </span>
      </div>
    </button>
  );

  const isComplete = flowState.deviceType && flowState.operatingSystem && flowState.problem;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="w-full px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            مساعد الدعم التقني
          </h1>
          <p className="text-center text-gray-600 text-lg">
            دعنا نساعدك في العثور على الحل المناسب لجهازك
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Step 1: Device Type */}
          <section className="animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ما نوع الجهاز الذي تستخدمه؟
              </h2>
              <p className="text-gray-600 text-lg">
                صف المشكلة في {flowState.deviceType ? getDeviceLabel(flowState.deviceType) : 'جهازك'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <OptionButton
                icon={Monitor}
                label="كمبيوتر"
                onClick={() => handleDeviceSelection('computer')}
                isSelected={flowState.deviceType === 'computer'}
                delay={100}
              />
              <OptionButton
                icon={Smartphone}
                label="هاتف محمول"
                onClick={() => handleDeviceSelection('mobile')}
                isSelected={flowState.deviceType === 'mobile'}
                delay={200}
              />
            </div>
          </section>

          {/* Step 2: Operating System */}
          {flowState.deviceType && (
            <section className="animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ما نظام التشغيل الذي تستخدمه؟
                </h2>
                <p className="text-gray-600 text-lg">
                  اختر نظام التشغيل المناسب لجهازك
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {flowState.deviceType === 'computer' && (
                  <>
                    <OptionButton
                      icon={Windows}
                      label="ويندوز"
                      onClick={() => handleOSSelection('windows')}
                      isSelected={flowState.operatingSystem === 'windows'}
                      delay={100}
                    />
                    <OptionButton
                      icon={Linux}
                      label="لينكس"
                      onClick={() => handleOSSelection('linux')}
                      isSelected={flowState.operatingSystem === 'linux'}
                      delay={200}
                    />
                  </>
                )}
                {flowState.deviceType === 'mobile' && (
                  <>
                    <OptionButton
                      icon={AndroidIcon}
                      label="أندرويد"
                      onClick={() => handleOSSelection('android')}
                      isSelected={flowState.operatingSystem === 'android'}
                      delay={100}
                    />
                    <OptionButton
                      icon={Apple}
                      label="آي أو إس"
                      onClick={() => handleOSSelection('ios')}
                      isSelected={flowState.operatingSystem === 'ios'}
                      delay={200}
                    />
                  </>
                )}
              </div>
            </section>
          )}

          {/* Step 3: Problem Selection */}
          {flowState.operatingSystem && (
            <section className="animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ما المشكلة التي تواجهها؟
                </h2>
                <p className="text-gray-600 text-lg">
                  صف المشكلة في {getDeviceLabel(flowState.deviceType)}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {flowState.deviceType === 'computer' ? (
                  <>
                    <OptionButton
                      icon={Gauge}
                      label="أداء بطيء"
                      onClick={() => handleProblemSelection('slow_performance')}
                      isSelected={flowState.problem === 'slow_performance'}
                      delay={100}
                    />
                    <OptionButton
                      icon={Eye}
                      label="مشكلة في الشاشة"
                      onClick={() => handleProblemSelection('screen_issue')}
                      isSelected={flowState.problem === 'screen_issue'}
                      delay={200}
                    />
                    <OptionButton
                      icon={Power}
                      label="لا يعمل"
                      onClick={() => handleProblemSelection('not_working')}
                      isSelected={flowState.problem === 'not_working'}
                      delay={300}
                    />
                  </>
                ) : (
                  <>
                    <OptionButton
                      icon={Battery}
                      label="البطارية"
                      onClick={() => handleProblemSelection('battery')}
                      isSelected={flowState.problem === 'battery'}
                      delay={100}
                    />
                    <OptionButton
                      icon={Eye}
                      label="الشاشة"
                      onClick={() => handleProblemSelection('screen')}
                      isSelected={flowState.problem === 'screen'}
                      delay={200}
                    />
                    <OptionButton
                      icon={Wifi}
                      label="الشبكة"
                      onClick={() => handleProblemSelection('network')}
                      isSelected={flowState.problem === 'network'}
                      delay={300}
                    />
                  </>
                )}
              </div>
            </section>
          )}

          {/* Results */}
          {isComplete && (
            <section className="animate-fadeIn">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} className="text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
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
                
                <p className="text-gray-600 mb-8 text-lg text-center">
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
            </section>
          )}

          {/* Notes Card */}
          <section className="animate-fadeIn">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <FileText className="text-amber-600 ml-3" size={24} />
                <h3 className="text-xl font-bold text-amber-800">ملاحظات مهمة</h3>
              </div>
              <div className="text-amber-700 space-y-3">
                <p>• تأكد من حفظ جميع ملفاتك المهمة قبل تطبيق أي حلول تقنية</p>
                <p>• في حالة عدم نجاح الحلول المقترحة، لا تتردد في التواصل مع فريق الدعم التقني</p>
                <p>• يُنصح بإجراء نسخة احتياطية دورية لبياناتك لتجنب فقدانها</p>
                <p>• بعض المشاكل قد تتطلب تدخل فني متخصص، خاصة المشاكل المتعلقة بالأجهزة</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer with Copyright */}
      <footer className="w-full px-6 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <p className="text-gray-600">تحتاج مساعدة إضافية؟ تواصل مع فريق الدعم في أي وقت.</p>
            <div className="flex items-center justify-center text-gray-500">
              <Copyright size={16} className="ml-2" />
              <span className="text-sm">جميع الحقوق محفوظة © 2025 - مجدي عاطف زهران</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;