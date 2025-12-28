
import React from 'react';
import type { Teil1Answers, Teil1Results } from '../types';

interface Teil1Props {
  answers: Teil1Answers;
  onAnswersChange: (newAnswers: Teil1Answers) => void;
  isSubmitted: boolean;
  results: Teil1Results;
}

const correctTeil1AnswersText = {
  anzahlPersonen: '4',
  davonKinder: '2',
  ort: 'Seeheim',
  zahlungsweise: 'Bar',
  reisetermin: 'nächsten Sonntag',
};


const Teil1: React.FC<Teil1Props> = ({ answers, onAnswersChange, isSubmitted, results }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onAnswersChange({ ...answers, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswersChange({ ...answers, zahlungsweise: e.target.value as 'Bar' | 'Kreditkarte' });
  };

  const getValidationClasses = (isCorrect: boolean | undefined) => {
    if (!isSubmitted) return '';
    return isCorrect ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800';
  };

  const getRadioContainerClasses = (isCorrect: boolean | undefined) => {
    if (!isSubmitted) return 'border-transparent';
    return isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400';
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in">
      <h3 className="text-2xl font-bold mb-2 text-gray-800">Teil 1</h3>
      {!isSubmitted && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
          <p className="text-gray-700 leading-relaxed">
            Ihre Freundin, Eva Kadavy, macht mit ihrem Mann und ihren beiden Söhnen (8 und 11 Jahre alt) Urlaub in Seeheim.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Im Reisebüro bucht sie für den nächsten Sonntag eine Busfahrt um den Bodensee. Frau Kadavy hat keine Kreditkarte.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            In dem Formular fehlen fünf Informationen.
          </p>
          <p className="text-gray-700 leading-relaxed font-normal mt-2">
            Helfen Sie Ihrer Freundin und schreiben Sie die fünf fehlenden Informationen in das Formular. Am Ende schreiben Sie Ihre Lösungen bitte auf den Antwortbogen.
          </p>
        </div>
      )}
      

      <div>
        <div className="bg-stone-50 rounded-lg p-6 sm:p-10 shadow-lg relative">
            <div className="text-center mb-8">
                <h4 className="text-4xl sm:text-5xl text-gray-900 tracking-widest">BODENSEE-RUNDFAHRT</h4>
                <p className="text-2xl text-gray-900 mt-2">Anmeldung</p>
            </div>
            
            <div className="space-y-4">
                <FormRow label="Familienname, Vorname:" value="Kadavy, Eva" number="(0)" isStatic />
                <FormRow label="Anzahl der Personen:" name="anzahlPersonen" value={answers.anzahlPersonen} onChange={handleChange} number="(1)" isSubmitted={isSubmitted} isCorrect={results.anzahlPersonen} correctAnswer={correctTeil1AnswersText.anzahlPersonen} readOnly={isSubmitted} />
                <FormRow label="Davon Kinder:" name="davonKinder" value={answers.davonKinder} onChange={handleChange} number="(2)" isSubmitted={isSubmitted} isCorrect={results.davonKinder} correctAnswer={correctTeil1AnswersText.davonKinder} readOnly={isSubmitted} />
                <FormRow label="Urlaubsadresse:" value="Hotel Schönblick" isStatic />
                <FormRow label="Straße, Hausnummer.:" value="Burgstraße 34" isStatic />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <label htmlFor="ort" className="font-medium text-gray-700 w-full sm:w-1/3 text-left">PLZ, Urlaubsort:</label>
                    <div className="flex-grow w-full flex items-center space-x-2">
                        <input
                            type="text"
                            value="78014"
                            disabled
                            className="p-2 border border-gray-300 bg-gray-200 rounded-md shadow-sm w-[5.5rem] text-center"
                        />
                        <input
                            type="text"
                            id="ort"
                            name="ort"
                            value={answers.ort}
                            onChange={handleChange}
                            className={`w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${getValidationClasses(results.ort)}`}
                            required
                            readOnly={isSubmitted}
                        />
                    </div>
                    <div className="w-auto pl-2 sm:w-1/3 flex items-center h-full">
                       <span className="text-gray-500 mr-2 sm:mr-4">(3)</span>
                       {isSubmitted && !results.ort && <span className="bg-green-600 text-white text-base font-bold px-2 py-1 rounded-md">{correctTeil1AnswersText.ort}</span>}
                    </div>
                </div>
            </div>

            <p className="mt-8 mb-4 text-gray-700">Der Reisepreis ist mit der Anmeldung zu bezahlen.</p>

            <div className={`p-2 rounded-md border-2 ${getRadioContainerClasses(results.zahlungsweise)}`}>
                <div className="flex items-start sm:items-center space-x-2 sm:space-x-4 flex-col sm:flex-row">
                    <label className={`font-medium text-gray-700 w-full sm:w-1/3 text-left ${isSubmitted ? (results.zahlungsweise ? 'text-green-800' : 'text-red-800') : ''}`}>Zahlungsweise:</label>
                    <div className="flex-grow flex items-center space-x-6 mt-2 sm:mt-0">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="zahlungsweise" value="Bar" checked={answers.zahlungsweise === 'Bar'} onChange={handleRadioChange} className="form-radio h-5 w-5 text-blue-600" disabled={isSubmitted}/>
                            <span>Bar</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="zahlungsweise" value="Kreditkarte" checked={answers.zahlungsweise === 'Kreditkarte'} onChange={handleRadioChange} className="form-radio h-5 w-5 text-blue-600" disabled={isSubmitted}/>
                            <span>Kreditkarte</span>
                        </label>
                    </div>
                    <div className="w-auto pl-2 sm:w-1/3 flex items-center">
                        <span className="text-gray-500 mr-2 sm:mr-4">(4)</span>
                        {isSubmitted && !results.zahlungsweise && <span className="bg-green-600 text-white text-base font-bold px-2 py-1 rounded-md">{correctTeil1AnswersText.zahlungsweise}</span>}
                    </div>
                </div>
            </div>

            <FormRow label="Reisetermin:" name="reisetermin" value={answers.reisetermin} onChange={handleChange} number="(5)" isSubmitted={isSubmitted} isCorrect={results.reisetermin} correctAnswer={correctTeil1AnswersText.reisetermin} readOnly={isSubmitted}/>
            
            <div className="mt-8 flex items-baseline space-x-4">
                <span className="font-medium text-gray-700">Unterschrift:</span>
                <span className="font-serif text-2xl italic text-gray-800">Eva Kadavy</span>
            </div>
        </div>
      </div>
    </div>
  );
};

interface FormRowProps {
    label: string;
    name?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    number?: string;
    isStatic?: boolean;
    placeholder?: string;
    isSubmitted?: boolean;
    isCorrect?: boolean;
    correctAnswer?: string;
    readOnly?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({ label, name, value, onChange, number, isStatic = false, placeholder, isSubmitted, isCorrect, correctAnswer, readOnly }) => {
    const baseClasses = "w-full p-2 border rounded-md shadow-sm";
    const staticClasses = "bg-gray-200 text-gray-800";
    const inputClasses = "bg-white focus:ring-blue-500 focus:border-blue-500";
    
    let validationClasses = '';
    if (isSubmitted) {
        if (isCorrect) {
            validationClasses = 'bg-green-50 border-green-500 text-green-800';
        } else {
            validationClasses = 'bg-red-50 border-red-500 text-red-800';
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <label htmlFor={name} className="font-medium text-gray-700 w-full sm:w-1/3 text-left">{label}</label>
            <div className="flex-grow w-full">
                {isStatic ? (
                    <p className={`${baseClasses} ${staticClasses}`}>{value}</p>
                ) : (
                    <input
                        type="text"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseClasses} ${inputClasses} ${validationClasses}`}
                        required
                        readOnly={readOnly}
                    />
                )}
            </div>
            <div className="w-auto pl-2 sm:w-1/3 flex items-center">
                {number && <span className="text-gray-500 mr-2 sm:mr-4">{number}</span>}
                {isSubmitted && !isCorrect && (
                    <span className="bg-green-600 text-white text-base font-bold px-2 py-1 rounded-md">{correctAnswer}</span>
                )}
            </div>
        </div>
    );
};


export default Teil1;