
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// Type definitions for API response
interface Teil1Feedback {
    personen: { correct: boolean; correctAnswer: string };
    kinder: { correct: boolean; correctAnswer: string };
    urlaubsort: { correct: boolean; correctAnswer: string };
    zahlung: { correct: boolean; correctAnswer: string };
    reisetermin: { correct: boolean; correctAnswer:string };
}

// Define props for Teil1
interface Teil1Props {
    numPersonen: string;
    setNumPersonen: (value: string) => void;
    numKinder: string;
    setNumKinder: (value: string) => void;
    urlaubsort: string;
    setUrlaubsort: (value: string) => void;
    bar: boolean;
    setBar: (value: boolean) => void;
    kreditkarte: boolean;
    setKreditkarte: (value: boolean) => void;
    reisetermin: string;
    setReisetermin: (value: string) => void;
    feedback: Teil1Feedback | null;
}

const Teil1: React.FC<Teil1Props> = ({
    numPersonen, setNumPersonen,
    numKinder, setNumKinder,
    urlaubsort, setUrlaubsort,
    bar, setBar,
    kreditkarte, setKreditkarte,
    reisetermin, setReisetermin,
    feedback
}) => {
    const getInputClass = (isCorrect: boolean | undefined) => {
        if (isCorrect === true) return 'bg-green-100 border-2 border-green-500';
        if (isCorrect === false) return 'bg-red-100 border-2 border-red-500';
        return 'bg-gray-200';
    };

    const handleBarChange = (checked: boolean) => {
        setBar(checked);
        if (checked) {
            setKreditkarte(false);
        }
    };

    const handleKreditkarteChange = (checked: boolean) => {
        setKreditkarte(checked);
        if (checked) {
            setBar(false);
        }
    };


    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teil 1</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 text-lg space-y-2 leading-snug">
                <p>Ihre Freundin, Eva Kadavy, macht mit ihrem Mann und ihren beiden Söhnen (8 und 11 Jahre alt) Urlaub in Seeheim.</p>
                <p>Im Reisebüro bucht sie für den nächsten Sonntag eine Busfahrt um den Bodensee.</p>
                <p>Frau Kadavy hat keine Kreditkarte.</p>
                <p>In dem Formular fehlen fünf Informationen.</p>
                <p>Helfen Sie Ihrer Freundin und schreiben Sie die fünf fehlenden Informationen in das Formular.</p>
                <p>Am Ende schreiben Sie Ihre Lösungen bitte auf den <span className="font-bold">Antwortbogen.</span></p>
            </div>

            <div className="mt-12 bg-stone-50 p-6 sm:p-10 rounded-xl shadow-lg border-2 border-stone-200">
                <h3 className="text-center text-4xl font-bold text-stone-700 tracking-wider mb-2">BODENSEE-RUNDFAHRT</h3>
                <h4 className="text-center text-2xl text-stone-600 mb-8">Anmeldung</h4>

                <form className="space-y-3 text-lg">
                    {/* ... other form fields ... */}
                    <div className="flex flex-wrap items-center justify-between">
                        <label className="w-full sm:w-1/3 text-stone-800">Familienname, Vorname:</label>
                        <div className="flex-1 bg-gray-300 p-2 rounded-md text-gray-800 font-semibold">Kadavy, Eva</div>
                        <span className="w-10 text-right text-gray-500">(0)</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <label htmlFor="personen" className="w-full sm:w-1/3 text-stone-800">Anzahl der Personen:</label>
                        <div className="flex-1 flex items-center gap-2">
                           <input id="personen" type="text" value={numPersonen} onChange={(e) => setNumPersonen(e.target.value)} className={`flex-1 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${feedback ? getInputClass(feedback.personen.correct) : 'bg-gray-200'}`}/>
                           {feedback && !feedback.personen.correct && <span className="text-green-600 font-semibold">{feedback.personen.correctAnswer}</span>}
                        </div>
                        <span className="w-10 text-right text-gray-500">(1)</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <label htmlFor="kinder" className="w-full sm:w-1/3 text-stone-800">Davon Kinder:</label>
                        <div className="flex-1 flex items-center gap-2">
                           <input id="kinder" type="text" value={numKinder} onChange={(e) => setNumKinder(e.target.value)} className={`flex-1 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${feedback ? getInputClass(feedback.kinder.correct) : 'bg-gray-200'}`}/>
                            {feedback && !feedback.kinder.correct && <span className="text-green-600 font-semibold">{feedback.kinder.correctAnswer}</span>}
                        </div>
                        <span className="w-10 text-right text-gray-500">(2)</span>
                    </div>
                    {/* ... other form fields ... */}
                     <div className="flex flex-wrap items-center justify-between">
                        <label className="w-full sm:w-1/3 text-stone-800">Urlaubsadresse:</label>
                        <div className="flex-1 bg-gray-300 p-2 rounded-md text-gray-800">Hotel Schönblick</div>
                        <span className="w-10 text-right text-gray-500"></span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <label className="w-full sm:w-1/3 text-stone-800">Straße, Hausnummer.:</label>
                        <div className="flex-1 bg-gray-300 p-2 rounded-md text-gray-800">Burgstraße 34</div>
                        <span className="w-10 text-right text-gray-500"></span>
                    </div>
                     <div className="flex flex-wrap items-center justify-between">
                        <label htmlFor="urlaubsort" className="w-full sm:w-1/3 text-stone-800">PLZ, Urlaubsort:</label>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="bg-gray-300 p-2 rounded-md text-gray-800 font-semibold">78014</div>
                             <div className="flex-1 flex items-center gap-2">
                                <input id="urlaubsort" type="text" value={urlaubsort} onChange={(e) => setUrlaubsort(e.target.value)} className={`flex-1 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${feedback ? getInputClass(feedback.urlaubsort.correct) : 'bg-gray-200'}`} />
                                {feedback && !feedback.urlaubsort.correct && <span className="text-green-600 font-semibold">{feedback.urlaubsort.correctAnswer}</span>}
                            </div>
                        </div>
                        <span className="w-10 text-right text-gray-500">(3)</span>
                    </div>

                    <p className="pt-6 text-stone-600">Der Reisepreis ist mit der Anmeldung zu bezahlen.</p>

                    <div className="flex flex-wrap items-start justify-between">
                        <label className="w-full sm:w-1/3 text-stone-800 pt-2">Zahlungsweise:</label>
                        <div className={`flex-1 space-y-2 p-2 rounded-md ${feedback ? getInputClass(feedback.zahlung.correct) : ''}`}>
                             <div className="flex items-center">
                                <input id="bar" type="checkbox" checked={bar} onChange={(e) => handleBarChange(e.target.checked)} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="bar" className="ml-3 text-stone-800">Bar</label>
                             </div>
                             <div className="flex items-center">
                                <input id="kreditkarte" type="checkbox" checked={kreditkarte} onChange={(e) => handleKreditkarteChange(e.target.checked)} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="kreditkarte" className="ml-3 text-stone-800">Kreditkarte</label>
                             </div>
                        </div>
                        <div className="w-10 text-right">
                           {feedback && !feedback.zahlung.correct && <span className="text-green-600 font-semibold block">{feedback.zahlung.correctAnswer}</span>}
                           <span className="text-gray-500">(4)</span>
                        </div>
                    </div>
                     <div className="flex flex-wrap items-center justify-between">
                        <label htmlFor="reisetermin" className="w-full sm:w-1/3 text-stone-800">Reisetermin:</label>
                         <div className="flex-1 flex items-center gap-2">
                           <input id="reisetermin" type="text" value={reisetermin} onChange={(e) => setReisetermin(e.target.value)} className={`flex-1 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${feedback ? getInputClass(feedback.reisetermin.correct) : 'bg-gray-200'}`} />
                           {feedback && !feedback.reisetermin.correct && <span className="text-green-600 font-semibold">{feedback.reisetermin.correctAnswer}</span>}
                        </div>
                        <span className="w-10 text-right text-gray-500">(5)</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between pt-8">
                        <label className="w-full sm:w-1/3 text-stone-800">Unterschrift:</label>
                        <div className="flex-1 text-2xl italic text-stone-800">Eva Kadavy</div>
                        <span className="w-10 text-right text-gray-500"></span>
                    </div>
                </form>
            </div>
        </section>
    );
}

// Define props for Teil2
interface Teil2Props {
    letter: string;
    setLetter: (value: string) => void;
}

const Teil2: React.FC<Teil2Props> = ({ letter, setLetter }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teil 2</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 text-lg mb-8 leading-snug">
                <p className="mb-4">Sie möchten im August Dresden besuchen. Schreiben Sie an die Touristeninformation:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Warum schreiben Sie?</li>
                    <li>Bitten Sie: Informationen über Filme, Museen usw. (Kulturprogramm).</li>
                    <li>Fragen Sie: Hoteladressen?</li>
                </ul>
            </div>

            <div className="relative my-12 flex justify-center">
                 <div className="bg-yellow-50 p-6 rounded-md shadow-lg border border-yellow-200 transform -rotate-2 w-full max-w-md">
                    <p className="text-yellow-800 text-lg leading-relaxed">
                        Schreiben Sie zu jedem Punkt ein bis zwei Sätze auf den Antwortbogen (circa 30 Wörter).
                        Schreiben Sie auch eine Anrede und einen Gruß.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                 <textarea
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder="Schreiben Sie hier Ihre Antwort..."
                />
            </div>
        </section>
    );
};


export default function App() {
  // State for Teil 1
  const [numPersonen, setNumPersonen] = useState('');
  const [numKinder, setNumKinder] = useState('');
  const [urlaubsort, setUrlaubsort] = useState('');
  const [bar, setBar] = useState(false);
  const [kreditkarte, setKreditkarte] = useState(false);
  const [reisetermin, setReisetermin] = useState('');
  
  // State for Teil 2
  const [letter, setLetter] = useState('');
  
  // State for API results
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number | null; feedback: string }>({ score: null, feedback: '' });
  const [teil1Result, setTeil1Result] = useState<Teil1Feedback | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sampleLetter, setSampleLetter] = useState('');
  
  const handleCheckExam = async () => {
    setLoading(true);
    setShowResult(true);
    setResult({ score: null, feedback: '' });
    setTeil1Result(null);
    setSampleLetter('');

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        You are an expert examiner for the Goethe-Institut's "Start Deutsch 1" (A1) German language exam. Your task is to grade the "Schreiben" (Writing) section of a practice test submitted by a student. The final feedback must be in Persian.

        **Context for Teil 1:**
        - A friend, Eva Kadavy, is on vacation with her husband and two sons (ages 8 and 11) in Seeheim.
        - She is booking a bus tour for the upcoming Sunday.
        - She does not have a credit card.
        - The student needs to fill in 5 missing pieces of information.

        **Correct Answers for Teil 1:**
        1. Anzahl der Personen: "4"
        2. Davon Kinder: "2"
        3. Urlaubsort: "Seeheim"
        4. Zahlungsweise: Bar (checked), Kreditkarte (unchecked)
        5. Reisetermin: "Sonntag"

        **Student's Answers for Teil 1:**
        - Anzahl der Personen: "${numPersonen}"
        - Davon Kinder: "${numKinder}"
        - Urlaubsort: "${urlaubsort}"
        - Zahlungsweise: Bar: ${bar}, Kreditkarte: ${kreditkarte}
        - Reisetermin: "${reisetermin}"

        **Context for Teil 2:**
        - The student wants to visit Dresden in August.
        - They need to write a short formal message (approx. 30 words) to the tourist information office, covering three points:
            1. Reason for writing.
            2. Request for cultural program info.
            3. Question about hotel addresses.
        - It must include a proper salutation and closing.

        **Student's Answer for Teil 2:**
        "${letter}"

        **Your Task:**
        1. **Grade Both Parts:** Evaluate both Teil 1 and Teil 2 based on the provided correct answers and A1 level standards.
        2. **Calculate a Total Score:** Combine the scores from both parts into a single score out of 100.
        3. **Provide Detailed Teil 1 Feedback:** For each of the 5 fields in Teil 1, indicate if the student's answer was correct and provide the correct answer.
        4. **Provide Overall Feedback in Persian:** Write a concise, constructive feedback report in Persian. Explain the score, pointing out what the student did well and where they can improve for both parts.
        5. **Provide a Sample Letter (if needed):** If the overall score is less than 60, provide a well-written, standard sample letter that correctly addresses all three points for Teil 2. This sample should be complete with a proper salutation and closing. Crucially, use newline characters (\\n) to separate the salutation, body paragraphs, and the closing, ensuring it is formatted like a real letter. If the student passes, return an empty string for the sample letter.
        6. **Return the result in the specified JSON format.**
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        feedback: { type: Type.STRING },
                        teil1Feedback: {
                            type: Type.OBJECT,
                            properties: {
                                personen: { type: Type.OBJECT, properties: { correct: { type: Type.BOOLEAN }, correctAnswer: { type: Type.STRING } } },
                                kinder: { type: Type.OBJECT, properties: { correct: { type: Type.BOOLEAN }, correctAnswer: { type: Type.STRING } } },
                                urlaubsort: { type: Type.OBJECT, properties: { correct: { type: Type.BOOLEAN }, correctAnswer: { type: Type.STRING } } },
                                zahlung: { type: Type.OBJECT, properties: { correct: { type: Type.BOOLEAN }, correctAnswer: { type: Type.STRING } } },
                                reisetermin: { type: Type.OBJECT, properties: { correct: { type: Type.BOOLEAN }, correctAnswer: { type: Type.STRING } } },
                            }
                        },
                        sampleLetter: { type: Type.STRING }
                    },
                    required: ["score", "feedback", "teil1Feedback", "sampleLetter"],
                },
            },
        });
        
        const resultJson = JSON.parse(response.text.trim());
        setResult({ score: resultJson.score, feedback: resultJson.feedback });
        setTeil1Result(resultJson.teil1Feedback);
        setSampleLetter(resultJson.sampleLetter || '');

    } catch (error) {
        console.error("Error checking exam:", error);
        setResult({ score: null, feedback: "خطا در بررسی آزمون. لطفا دوباره تلاش کنید." });
    } finally {
        setLoading(false);
    }
  };

  const resultStatus = result.score !== null ? (result.score >= 60 ? 'pass' : 'fail') : '';
  const resultBgColor = resultStatus === 'pass' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800';
  const resultTextColor = resultStatus === 'pass' ? 'text-green-600' : 'text-red-600';


  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-700 text-lg mb-12">
            <p>Kandidatenblätter</p>
            <hr className="my-4 border-gray-300"/>
            <h1 className="text-5xl font-bold mb-4">Schreiben</h1>
            <p className="mt-4">circa 20 Minuten</p>
            <p>Dieser Test hat zwei Teile.</p>
            <p>Sie füllen ein Formular aus und schreiben einen kurzen Text.</p>
        </div>
        <Teil1 
            numPersonen={numPersonen} setNumPersonen={setNumPersonen}
            numKinder={numKinder} setNumKinder={setNumKinder}
            urlaubsort={urlaubsort} setUrlaubsort={setUrlaubsort}
            bar={bar} setBar={setBar}
            kreditkarte={kreditkarte} setKreditkarte={setKreditkarte}
            reisetermin={reisetermin} setReisetermin={setReisetermin}
            feedback={teil1Result}
        />
        <Teil2 
            letter={letter} setLetter={setLetter}
        />

        <div className="mt-12 text-center">
            <button 
                onClick={handleCheckExam}
                disabled={loading}
                className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Vazirmatn, sans-serif' }}
            >
                {loading ? 'در حال بررسی...' : 'بررسی آزمون'}
            </button>
        </div>
        
        {showResult && (
            <div dir="rtl" className="mt-12" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
                {loading ? (
                     <p className="text-center text-gray-600">لطفا کمی صبر کنید...</p>
                ) : (
                    <div className={`p-6 rounded-lg border-2 ${resultBgColor}`}>
                        <h3 className="text-2xl font-bold mb-4 text-right">نتیجه آزمون</h3>
                        {result.score !== null && (
                            <div className="mb-4 text-center">
                                <p className="text-lg">نمره شما:</p>
                                <p className={`text-5xl font-bold ${resultTextColor}`}>{result.score} <span className="text-3xl text-gray-700">/ 100</span></p>
                                <p className={`mt-2 text-xl font-semibold ${resultTextColor}`}>
                                    {resultStatus === 'pass' ? 'قبول' : 'مردود'}
                                </p>
                                {resultStatus === 'fail' && (
                                    <p className="text-sm text-gray-600 mt-2">برای قبولی باید حداقل نمره 60 را کسب کنید.</p>
                                )}
                            </div>
                        )}
                         <div className="mt-6 border-t border-gray-400/50 pt-4 text-right" style={{ whiteSpace: 'pre-wrap' }}>
                             <h4 className="font-bold text-xl mb-2">بازخورد:</h4>
                            <p className="text-lg leading-relaxed">{result.feedback}</p>
                        </div>
                        {resultStatus === 'fail' && sampleLetter && (
                            <div className="mt-6 border-t border-gray-400/50 pt-4 text-right">
                                <h4 className="font-bold text-xl mb-2">نمونه پاسخ برای بخش ۲:</h4>
                                <div dir="ltr" className="bg-white p-4 rounded-md border border-gray-300 text-gray-800 text-left shadow-sm">
                                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{sampleLetter}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}

        <footer className="text-center text-sm text-gray-500 mt-12 pb-4">
            <p>© {new Date().getFullYear()} www.apfel.ir. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
