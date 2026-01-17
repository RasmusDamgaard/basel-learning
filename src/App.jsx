import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Calculator, Scale, FileText, ChevronRight, ChevronLeft, Check, X, RotateCcw, Lightbulb, Award, Target, Layers, HelpCircle, AlertTriangle, Shuffle, Home } from 'lucide-react';
import { conceptualQuestions, classificationItems, calculationExercises, interpretationScenarios, flashcards } from './data';

// ==================== MAIN COMPONENT ====================
export default function BaselLearningAssistant() {
  const [activeModule, setActiveModule] = useState('home');
  const [activeApproach, setActiveApproach] = useState(null);
  const [activeTopic, setActiveTopic] = useState('lcr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [classificationCategory, setClassificationCategory] = useState('hqla');
  const [currentClassificationIndex, setCurrentClassificationIndex] = useState(0);
  const [classificationAnswer, setClassificationAnswer] = useState('');
  const [showClassificationAnswer, setShowClassificationAnswer] = useState(false);
  const [classificationScore, setClassificationScore] = useState({ correct: 0, total: 0 });
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const shuffleArray = (arr) => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  useEffect(() => {
    if (activeApproach === 'flashcards' && activeTopic) {
      setShuffledCards(shuffleArray(flashcards[activeTopic]));
      setCurrentFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [activeApproach, activeTopic]);

  const resetQuiz = () => { setCurrentQuestionIndex(0); setSelectedAnswer(null); setShowExplanation(false); setScore({ correct: 0, total: 0 }); setQuizCompleted(false); };
  const resetClassification = () => { setCurrentClassificationIndex(0); setClassificationAnswer(''); setShowClassificationAnswer(false); setClassificationScore({ correct: 0, total: 0 }); };

  const ModuleButton = ({ module, icon: Icon, title, description }) => (
    <button onClick={() => { setActiveModule(module); setActiveApproach(null); }} className={`p-4 rounded-lg border-2 transition-all text-left w-full ${activeModule === module ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-6 h-6 ${activeModule === module ? 'text-blue-600' : 'text-gray-600'}`} />
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );

  const ApproachButton = ({ approach, icon: Icon, title }) => (
    <button onClick={() => { setActiveApproach(approach); resetQuiz(); resetClassification(); setShowSolution(false); setShowHints(false); setShowGuidance(false); setShowModelAnswer(false); }} className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${activeApproach === approach ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-300'}`}>
      <Icon className="w-5 h-5" /><span className="font-medium">{title}</span>
    </button>
  );

  const TopicSelector = () => (
    <div className="flex gap-2 mb-4 flex-wrap">
      {[
        { id: 'lcr', label: 'LCR' },
        { id: 'nsfr', label: 'NSFR' },
        { id: 'almm', label: 'ALMM' },
        { id: 'capital', label: 'Capital' },
        { id: 'leverage', label: 'Leverage' },
        { id: 'creditrisk', label: 'Credit Risk' },
        { id: 'marketrisk', label: 'Market Risk' },
        { id: 'operational', label: 'Op Risk' },
        { id: 'pillar2', label: 'Pillar 2' },
        { id: 'pillar3', label: 'Pillar 3' },
        { id: 'repos', label: 'Repos' },
        { id: 'bonds', label: 'Bonds' }
      ].map(t => (
        <button key={t.id} onClick={() => { setActiveTopic(t.id); resetQuiz(); resetClassification(); }} className={`px-3 py-2 rounded-lg font-medium text-sm ${activeTopic === t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{t.label}</button>
      ))}
    </div>
  );

  const renderQuiz = () => {
    const questions = conceptualQuestions[activeTopic];
    if (!questions?.length) return <p>No questions available.</p>;
    if (quizCompleted) {
      const pct = Math.round((score.correct / score.total) * 100);
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <Award className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-green-500' : 'text-yellow-500'}`} />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-xl mb-4">Score: {score.correct}/{score.total} ({pct}%)</p>
          <button onClick={resetQuiz} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><RotateCcw className="w-4 h-4" /> Try Again</button>
        </div>
      );
    }
    const q = questions[currentQuestionIndex];
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span className={`text-xs px-2 py-1 rounded ${q.difficulty === 'basic' ? 'bg-green-100 text-green-700' : q.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty}</span>
        </div>
        <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
        <div className="space-y-2 mb-4">
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => !showExplanation && setSelectedAnswer(idx)} disabled={showExplanation} className={`w-full p-3 text-left rounded-lg border transition-all ${showExplanation ? (idx === q.correct ? 'border-green-500 bg-green-50' : selectedAnswer === idx ? 'border-red-500 bg-red-50' : 'border-gray-200') : (selectedAnswer === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300')}`}>
              <div className="flex items-center gap-2">
                {showExplanation && idx === q.correct && <Check className="w-5 h-5 text-green-600" />}
                {showExplanation && selectedAnswer === idx && idx !== q.correct && <X className="w-5 h-5 text-red-600" />}
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
        {!showExplanation && selectedAnswer !== null && <button onClick={() => { setShowExplanation(true); setScore(p => ({ correct: p.correct + (selectedAnswer === q.correct ? 1 : 0), total: p.total + 1 })); }} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Check Answer</button>}
        {showExplanation && (
          <div className="mt-4">
            <div className={`p-4 rounded-lg ${selectedAnswer === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-5 h-5 text-amber-500" /><span className="font-semibold">Explanation</span></div>
              <p className="text-gray-700 mb-2">{q.explanation}</p>
              <p className="text-sm text-gray-500">Reference: {q.reference}</p>
            </div>
            <button onClick={() => { if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(p => p + 1); setSelectedAnswer(null); setShowExplanation(false); } else setQuizCompleted(true); }} className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Results'} <ChevronRight className="w-4 h-4" /></button>
          </div>
        )}
      </div>
    );
  };

  const renderClassification = () => {
    const categories = {
      hqla: { title: 'HQLA Classification', options: ['Level 1', 'Level 2A', 'Level 2B', 'Ineligible'] },
      asf: { title: 'ASF Factors', options: ['100%', '95%', '90%', '50%', '0%'] },
      rsf: { title: 'RSF Factors', options: ['0%', '5%', '10%', '15%', '25%', '50%', '65%', '85%', '100%'] },
      outflows: { title: 'Outflow Rates', options: ['0%', '3%', '5%', '10%', '15%', '25%', '30%', '40%', '100%'] },
      riskweights: { title: 'Risk Weights', options: ['0%', '2%', '10%', '20%', '35%', '50%', '100%', '250%'] }
    };
    const items = classificationItems[classificationCategory];
    const current = items[currentClassificationIndex];
    const cat = categories[classificationCategory];
    if (classificationScore.total > 0 && classificationScore.total === items.length) {
      const pct = Math.round((classificationScore.correct / classificationScore.total) * 100);
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <Award className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-green-500' : 'text-yellow-500'}`} />
          <h3 className="text-2xl font-bold mb-2">Practice Complete!</h3>
          <p className="text-xl mb-4">Score: {classificationScore.correct}/{classificationScore.total} ({pct}%)</p>
          <button onClick={resetClassification} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><RotateCcw className="w-4 h-4" /> Again</button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(categories).map(([k, c]) => <button key={k} onClick={() => { setClassificationCategory(k); resetClassification(); }} className={`px-3 py-1 rounded text-sm font-medium ${classificationCategory === k ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c.title}</button>)}
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><span className="text-sm text-gray-500">Item {currentClassificationIndex + 1}/{items.length}</span><span className="text-sm font-medium text-purple-600">{cat.title}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4"><h3 className="text-lg font-semibold">{current.item}</h3></div>
          <p className="text-gray-600 mb-4">Select the correct classification:</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {cat.options.map(opt => <button key={opt} onClick={() => !showClassificationAnswer && setClassificationAnswer(opt)} disabled={showClassificationAnswer} className={`p-2 rounded-lg border text-sm ${showClassificationAnswer ? (opt === (current.level || current.factor) ? 'border-green-500 bg-green-50' : classificationAnswer === opt ? 'border-red-500 bg-red-50' : 'border-gray-200') : (classificationAnswer === opt ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300')}`}>{opt}</button>)}
          </div>
          {!showClassificationAnswer && classificationAnswer && <button onClick={() => { setShowClassificationAnswer(true); setClassificationScore(p => ({ correct: p.correct + (classificationAnswer === (current.level || current.factor) ? 1 : 0), total: p.total + 1 })); }} className="w-full py-2 bg-purple-600 text-white rounded-lg">Check</button>}
          {showClassificationAnswer && (
            <div className="mt-4">
              <div className={`p-4 rounded-lg ${classificationAnswer === (current.level || current.factor) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="font-medium mb-2">{classificationAnswer === (current.level || current.factor) ? '✓ Correct!' : `✗ Answer: ${current.level || current.factor}`}</p>
                <p className="text-gray-700">{current.explanation}</p>
                {current.haircut && <p className="text-sm text-gray-500 mt-1">Haircut: {current.haircut}</p>}
              </div>
              <button onClick={() => { if (currentClassificationIndex < items.length - 1) { setCurrentClassificationIndex(p => p + 1); setClassificationAnswer(''); setShowClassificationAnswer(false); } }} disabled={currentClassificationIndex >= items.length - 1} className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300">Next <ChevronRight className="w-4 h-4 inline" /></button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalculations = () => {
    const exercises = calculationExercises.filter(e => e.type === activeTopic || activeTopic === 'almm');
    if (!exercises.length) return <p className="text-gray-500">No exercises for this topic.</p>;
    const ex = exercises[currentExerciseIndex % exercises.length];
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">{exercises.map((e, i) => <button key={e.id} onClick={() => { setCurrentExerciseIndex(i); setShowHints(false); setShowSolution(false); }} className={`px-3 py-1 rounded text-sm ${currentExerciseIndex === i ? 'bg-orange-600 text-white' : 'bg-gray-100'}`}>Ex {i + 1}</button>)}</div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><h3 className="text-lg font-bold">{ex.title}</h3><span className={`text-xs px-2 py-1 rounded ${ex.difficulty === 'basic' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ex.difficulty}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line font-mono text-sm">{ex.scenario}</div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4"><div className="flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-blue-600" /><span className="font-semibold">Question</span></div><p>{ex.question}</p></div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setShowHints(!showHints)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg flex items-center gap-2"><Lightbulb className="w-4 h-4" />{showHints ? 'Hide' : 'Show'} Hints</button>
            <button onClick={() => setShowSolution(!showSolution)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"><Check className="w-4 h-4" />{showSolution ? 'Hide' : 'Show'} Solution</button>
          </div>
          {showHints && <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200"><h4 className="font-semibold mb-2">Hints:</h4><ul className="space-y-1">{ex.hints.map((h, i) => <li key={i} className="flex items-start gap-2"><span className="text-amber-600">•</span>{h}</li>)}</ul></div>}
          {showSolution && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">Solution:</h4>
              <div className="space-y-2">{ex.solution.steps.map((s, i) => <div key={i} className="bg-white p-3 rounded border text-sm font-mono">{s}</div>)}</div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg"><p className="font-semibold text-green-800">{ex.solution.answer}</p></div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200"><div className="flex items-center gap-2 mb-1"><Lightbulb className="w-4 h-4 text-blue-600" /><span className="font-semibold text-blue-800">Key Insight</span></div><p className="text-blue-700 text-sm">{ex.solution.keyInsight}</p></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInterpretation = () => {
    const scenarios = interpretationScenarios.filter(s => activeTopic === 'almm' || s.category === activeTopic);
    if (!scenarios.length) return <p className="text-gray-500">No scenarios for this topic.</p>;
    const sc = scenarios[currentScenarioIndex % scenarios.length];
    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap mb-4">{scenarios.map((s, i) => <button key={s.id} onClick={() => { setCurrentScenarioIndex(i); setShowGuidance(false); setShowModelAnswer(false); }} className={`px-3 py-1 rounded text-sm ${currentScenarioIndex === i ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>{s.title.substring(0, 15)}...</button>)}</div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><h3 className="text-lg font-bold">{sc.title}</h3><span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">{sc.difficulty}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line">{sc.scenario}</div>
          <div className="bg-indigo-50 p-4 rounded-lg mb-4"><div className="flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-indigo-600" /><span className="font-semibold">Question</span></div><p>{sc.question}</p></div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setShowGuidance(!showGuidance)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg flex items-center gap-2"><Lightbulb className="w-4 h-4" />{showGuidance ? 'Hide' : 'Show'} Guidance</button>
            <button onClick={() => setShowModelAnswer(!showModelAnswer)} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg flex items-center gap-2"><FileText className="w-4 h-4" />{showModelAnswer ? 'Hide' : 'Model'} Answer</button>
          </div>
          {showGuidance && <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200"><h4 className="font-semibold mb-2">Regulatory References:</h4><ul className="space-y-1">{sc.guidance.map((g, i) => <li key={i}>• {g}</li>)}</ul><p className="text-sm text-amber-700 mt-3">Regulations: {sc.regulations.join(', ')}</p></div>}
          {showModelAnswer && <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"><h4 className="font-semibold mb-3">Model Answer:</h4><div className="whitespace-pre-line text-gray-700">{sc.modelAnswer}</div></div>}
        </div>
      </div>
    );
  };

  const renderFlashcards = () => {
    const cards = shuffledCards.length > 0 ? shuffledCards : flashcards[activeTopic];
    if (!cards?.length) return <p>No flashcards.</p>;
    const card = cards[currentFlashcardIndex];
    return (
      <div className="space-y-4">
        <div className="flex justify-between"><span className="text-sm text-gray-500">Card {currentFlashcardIndex + 1}/{cards.length}</span><button onClick={() => { setShuffledCards(shuffleArray(flashcards[activeTopic])); setCurrentFlashcardIndex(0); setIsFlipped(false); }} className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center gap-1"><Shuffle className="w-4 h-4" />Shuffle</button></div>
        <div onClick={() => setIsFlipped(!isFlipped)} className="bg-white rounded-xl p-8 shadow-lg border-2 min-h-48 flex items-center justify-center cursor-pointer hover:shadow-xl">
          <div className="text-center">
            {!isFlipped ? (<><p className="text-xs text-gray-400 mb-2">QUESTION</p><p className="text-xl font-semibold">{card.front}</p><p className="text-sm text-gray-400 mt-4">Click to reveal</p></>) : (<><p className="text-xs text-gray-400 mb-2">ANSWER</p><p className="text-lg">{card.back}</p></>)}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => { setCurrentFlashcardIndex(p => p > 0 ? p - 1 : cards.length - 1); setIsFlipped(false); }} className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Prev</button>
          <button onClick={() => { setCurrentFlashcardIndex(p => p < cards.length - 1 ? p + 1 : 0); setIsFlipped(false); }} className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">Next<ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Basel III Learning Platform</h1>
        <p className="text-gray-600">Master Basel III regulations including liquidity (LCR, NSFR, ALMM), capital, leverage, risk frameworks, repos, and bonds</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ModuleButton module="conceptual" icon={Brain} title="1. Conceptual Mastery" description="Understand the 'why' behind the requirements" />
        <ModuleButton module="classification" icon={Layers} title="2. Classification Practice" description="Drill HQLA tiers, ASF/RSF factors, outflow rates" />
        <ModuleButton module="calculation" icon={Calculator} title="3. Calculation Exercises" description="Work through ratio computations" />
        <ModuleButton module="interpretation" icon={Scale} title="4. Regulatory Interpretation" description="Handle ambiguous cases" />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
        <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-blue-600" /><span className="font-semibold text-blue-800">Study Tips</span></div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with conceptual mastery for foundations</li>
          <li>• Use classification practice to memorize factors</li>
          <li>• Apply through calculation exercises</li>
          <li>• Challenge with interpretation scenarios</li>
        </ul>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    if (activeModule === 'home') return renderHome();
    const configs = {
      conceptual: { title: 'Conceptual Mastery', icon: Brain, desc: 'Test your understanding of Basel III liquidity concepts', showTopic: true },
      classification: { title: 'Classification Practice', icon: Layers, desc: 'Practice classifying assets, liabilities, and flows', showTopic: false },
      calculation: { title: 'Calculation Exercises', icon: Calculator, desc: 'Work through step-by-step ratio calculations', showTopic: true },
      interpretation: { title: 'Regulatory Interpretation', icon: Scale, desc: 'Apply regulations to complex scenarios', showTopic: true }
    };
    const cfg = configs[activeModule];
    const Icon = cfg.icon;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Icon className="w-8 h-8 text-blue-600" /><div><h2 className="text-2xl font-bold">{cfg.title}</h2><p className="text-gray-600 text-sm">{cfg.desc}</p></div></div>
          <button onClick={() => setActiveModule('home')} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-1 text-sm"><Home className="w-4 h-4" />Home</button>
        </div>
        {cfg.showTopic && <TopicSelector />}
        <div className="flex gap-2 flex-wrap mb-4">
          <ApproachButton approach="quiz" icon={BookOpen} title="Quiz" />
          <ApproachButton approach="scenarios" icon={Target} title="Scenarios" />
          <ApproachButton approach="flashcards" icon={FileText} title="Flashcards" />
        </div>
        {activeApproach === 'quiz' && activeModule === 'conceptual' && renderQuiz()}
        {activeApproach === 'scenarios' && activeModule === 'conceptual' && renderQuiz()}
        {activeApproach === 'flashcards' && renderFlashcards()}
        {activeModule === 'classification' && renderClassification()}
        {activeModule === 'calculation' && renderCalculations()}
        {activeModule === 'interpretation' && renderInterpretation()}
        {!activeApproach && activeModule === 'conceptual' && <div className="bg-gray-50 p-6 rounded-lg text-center"><p className="text-gray-600">Select an approach above to begin</p></div>}
      </div>
    );
  };

  return (<div className="min-h-screen bg-gray-100 p-4"><div className="max-w-4xl mx-auto">{renderModuleContent()}</div></div>);
}
