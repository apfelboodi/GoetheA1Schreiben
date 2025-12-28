
import React from 'react';

interface Teil2Props {
  answer: string;
  onAnswerChange: (newAnswer: string) => void;
  isSubmitted: boolean;
}

const Teil2: React.FC<Teil2Props> = ({ answer, onAnswerChange, isSubmitted }) => {

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in">
      <h3 className="text-2xl font-bold mb-2 text-gray-800">Teil 2</h3>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
          Sie möchten im August Dresden besuchen. Schreiben Sie an die Touristeninformation:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
          <li>Warum schreiben Sie?</li>
          <li>Bitten Sie: Informationen über Filme, Museen usw. (Kulturprogramm).</li>
          <li>Fragen Sie: Hoteladressen?</li>
          </ul>
      </div>

      <div className="my-8 flex justify-center">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-md shadow-md transform -rotate-2 w-full max-w-md">
              <p className="text-center italic leading-loose">
                  Schreiben Sie zu jedem Punkt ein bis zwei Sätze auf den Antwortbogen (circa 30 Wörter).
                  Schreiben Sie auch eine Anrede und einen Gruß.
              </p>
          </div>
      </div>
      
      <div>
        <textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          placeholder="Schreiben Sie hier Ihre Nachricht..."
          required
          readOnly={isSubmitted}
        ></textarea>
      </div>
    </div>
  );
};

export default Teil2;