
import React, { useState, useMemo } from 'react';
// FIX: Import `Type` for defining response schema.
import { GoogleGenAI, Type } from "@google/genai";
import Teil1 from './components/Teil1';
import Teil2 from './components/Teil2';
import type { Teil1Answers, Teil1Results, Score, Teil2Feedback } from './types';

const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [teil1Answers, setTeil1Answers] = useState<Teil1Answers>({
    anzahlPersonen: '',
    davonKinder: '',
    ort: '',
    zahlungsweise: '',
    reisetermin: '',
  });
  const [teil2Answer, setTeil2Answer] = useState('');

  const [teil1Results, setTeil1Results] = useState<Teil1Results>({});
  const [teil2Feedback, setTeil2Feedback] = useState<Teil2Feedback | null>(null);
  const [score, setScore] = useState<Score | null>(null);

  const checkApproximateAnswer = (userAnswer: string, correctValues: string[], isSubstring?: boolean) => {
    const formattedUserAnswer = userAnswer.trim().toLowerCase();
    if (!formattedUserAnswer) return false;
    for (const val of correctValues) {
      if (isSubstring) {
        if (formattedUserAnswer.includes(val)) return true;
      } else {
        if (formattedUserAnswer === val) return true;
      }
    }
    return false;
  };

  const handleExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const results: Teil1Results = {
      anzahlPersonen: checkApproximateAnswer(teil1Answers.anzahlPersonen, ['4', 'vier']),
      davonKinder: checkApproximateAnswer(teil1Answers.davonKinder, ['2', 'zwei']),
      ort: checkApproximateAnswer(teil1Answers.ort, ['seeheim']),
      zahlungsweise: checkApproximateAnswer(teil1Answers.zahlungsweise, ['bar']),
      reisetermin: checkApproximateAnswer(teil1Answers.reisetermin, ['sonntag'], true),
    };
    setTeil1Results(results);
    const teil1Score = Object.values(results).filter(Boolean).length * 1;

    let teil2Score = 0;
    let feedback: Teil2Feedback = { persian: "خطا در تحلیل متن." };
    
    try {
      // کلید API به صورت مستقیم در کد قرار داده شده است.
      const apiKey = "AIzaSyCLGxGD0WGgfB7b6S6W9Ec9m38RSh_2Nic";
      const ai = new GoogleGenAI({ apiKey });
      
      // FIX: Simplified prompt, as JSON structure instructions are now in responseSchema.
      const combinedPrompt = `
        You are an expert Goethe A1 German exam evaluator.
        The student's text for "Schreiben Teil 2" is:
        ---
        ${teil2Answer}
        ---
        The task was: "You want to visit Dresden in August. Write to the tourist information office. - Why are you writing? - Ask for: Information about films, museums, etc. (cultural program). - Ask about: Hotel addresses?"
        Your task is to provide a score, constructive feedback, and a model answer based on the student's text and the task.
      `;

      // FIX: Use responseSchema to ensure JSON output and simplify parsing.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: combinedPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.INTEGER,
                description: "An integer score from 0 to 10 based on official A1 criteria (task fulfillment, salutation/closing, grammar)."
              },
              persianFeedback: {
                type: Type.STRING,
                description: "Constructive feedback in well-structured Persian. Use newline characters (`\\n`) to separate distinct paragraphs for better readability. Do NOT start with a greeting. Do NOT use asterisks (*)."
              },
              musterbrief: {
                type: Type.STRING,
                description: "A standard, correct German letter that perfectly answers the prompt, serving as a model answer. The letter must be properly formatted with newlines (`\\n`) for line breaks and paragraph separation (e.g., between the salutation, body paragraphs, and closing)."
              },
            },
            required: ["score", "persianFeedback", "musterbrief"],
          }
        }
      });
      // FIX: No need to clean up markdown fences when using responseMimeType: "application/json"
      let responseText = response.text.trim();
      
      try {
          const parsedData = JSON.parse(responseText);
          teil2Score = parsedData.score || 0;
          let finalFeedback: Teil2Feedback = { persian: "بازخورد دریافت نشد." };
          if (parsedData.persianFeedback) {
              finalFeedback.persian = parsedData.persianFeedback.replace(/\*/g, '');
          }
          if (parsedData.musterbrief) {
              finalFeedback.musterbrief = parsedData.musterbrief;
          }
          feedback = finalFeedback;
      } catch (parseError) {
          console.error("Failed to parse combined JSON from AI:", parseError, "Raw text:", responseText);
          feedback = { persian: "خطا در پردازش پاسخ هوش مصنوعی. لطفا دوباره تلاش کنید." };
      }
      setTeil2Feedback(feedback);

    } catch (error) {
      console.error("Error during AI evaluation:", error);
      // FIX: Simplified error handling as per API key guidelines.
      feedback = { persian: "خطا در ارتباط با سرویس هوش مصنوعی. این مشکل معمولاً به دلیل نامعتبر بودن کلید API یا مشکلات شبکه رخ می‌دهد." };
      setTeil2Feedback(feedback);
    }

    const totalScore = teil1Score + teil2Score;
    const maxPoints = 15;
    const percentage = Math.round((totalScore / maxPoints) * 100);
    const passed = percentage >= 60;
    setScore({ teil1: teil1Score, teil2: teil2Score, total: totalScore, maxPoints, percentage, passed });

    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleRetry = () => {
    setTeil1Answers({ anzahlPersonen: '', davonKinder: '', ort: '', zahlungsweise: '', reisetermin: '' });
    setTeil2Answer('');
    setIsSubmitted(false);
    setScore(null);
    setTeil1Results({});
    setTeil2Feedback(null);
  };

  const isFormComplete = useMemo(() => {
    return Object.values(teil1Answers).every(val => typeof val === 'string' && val.trim() !== '') && teil2Answer.trim() !== '';
  }, [teil1Answers, teil2Answer]);

  const PageHeader = () => (
     <div className="w-full max-w-5xl mb-8 bg-white p-8 rounded-lg shadow-lg font-sans text-gray-800 text-center">
        <p className="text-lg">Kandidatenblätter</p>
        <hr className="mt-2 border-t border-gray-800" />
        <h1 className="text-6xl font-bold text-black my-4 font-['Arial']">schreiben</h1>
        <div className="text-base">
            <p><strong className="font-bold font-['Arial']">circa 20 Minuten</strong></p>
            <p>Dieser Test hat zwei Teile.</p>
            <p>Sie füllen ein Formular aus und schreiben einen kurzen Text.</p>
            <p>Schreiben Sie zum Schluss Ihre Lösungen auf den <strong className="font-bold">Antwortbogen</strong>.</p>
            <p>Wörterbücher sind nicht erlaubt.</p>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4 sm:p-6">
      <main className="w-full max-w-5xl">
        <form onSubmit={handleExamSubmit}>
          {!isSubmitted && <PageHeader />}
          <Teil1
            answers={teil1Answers}
            onAnswersChange={setTeil1Answers}
            isSubmitted={isSubmitted}
            results={teil1Results}
          />
          <div className="my-8 h-px bg-gray-300"></div>
          <Teil2
            answer={teil2Answer}
            onAnswerChange={setTeil2Answer}
            isSubmitted={isSubmitted}
          />
          <div className="mt-8 text-center">
            {isSubmitted ? (
               <button
                type="button"
                onClick={handleRetry}
                className="bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Nochmal versuchen
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormComplete || isLoading}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'در حال تحلیل...' : 'نتیجه آزمون'}
              </button>
            )}
          </div>
        </form>

        {isSubmitted && score && (
          <div className="my-8">
            <ResultsSummary score={score} feedback={teil2Feedback} />
          </div>
        )}
      </main>
      <footer className="w-full max-w-5xl text-center mt-8 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} www.apfel.ir. All rights reserved.</p>
      </footer>
    </div>
  );
};

const ResultsSummary: React.FC<{score: Score, feedback: Teil2Feedback | null}> = ({ score, feedback }) => (
  <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Gesamtergebnis / نتیجه کل</h3>
      <div className={`text-center p-4 rounded-lg mb-6 ${score.passed ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className={`text-2xl font-bold ${score.passed ? 'text-green-800' : 'text-red-800'}`}>
              {score.passed ? 'Bestanden / قبول' : 'Nicht bestanden / مردود'}
          </p>
          <p className="text-lg mt-2 text-gray-700">
              {score.total} / {score.maxPoints} Punkte ({score.percentage}%)
          </p>
      </div>
      
      <h4 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">Teil 2: Feedback</h4>
       {feedback ? (
        <div className="mt-4 space-y-6">
            <div dir="rtl">
                <div 
                  className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap text-gray-800" 
                  style={{fontFamily: "'Vazirmatn', sans-serif"}}
                >
                    {feedback.persian}
                </div>
            </div>
            {feedback.musterbrief && (
                 <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-700 font-['Arial']">Beispieltext / متن نمونه:</h5>
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200 whitespace-pre-wrap text-gray-800 font-mono text-sm">
                        {feedback.musterbrief}
                    </div>
                </div>
            )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Feedback wird geladen...</p>
      )}
  </div>
);


export default App;
