import React from 'react';

function FichePedagogique({ ficheData, onClose }) {
  // Debug: afficher les données reçues
  console.log('FichePedagogique - ficheData:', ficheData);
  
  if (!ficheData) {
    console.log('Aucune donnée de fiche fournie');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50    bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-4xl p-8   max-w-4xl max-h-[90vh] overflow-hidden border-[#023045] border-3 border-solid shadow-2xl">
        {/* Header */}
        <div className=" text-[#023047] text-3xl text-center flex justify-center items-center">
          <h1 className="text-xl font-bold uppercase">{ficheData.titre}</h1>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Objectif */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">L'objectif pédagogique :</span> {ficheData.objectif}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Niveau de la fiche :</span> {ficheData.niveau}
            </p>
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Contenu pédagogique */}
          <h2 className="text-center text-lg font-bold text-[#023047] mb-6">
            Contenu pédagogique
          </h2>

          {/* Sections */}
          {ficheData.contenu.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-base font-bold text-[#023047] mb-4">
                {index + 1}. {section.titre}
              </h3>
              
              <div className="space-y-3">
                {section.contenu.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-sm text-gray-800 leading-relaxed">
                    {item.includes(':') ? (
                      <div>
                        <span className="font-semibold text-[#023047]">
                          {item.split(':')[0]}:
                        </span>
                        <span className="ml-1">
                          {item.split(':').slice(1).join(':')}
                        </span>
                      </div>
                    ) : item.startsWith('-') ? (
                      <div className="ml-4 flex">
                        <span className="mr-2">•</span>
                        <span>{item.substring(2)}</span>
                      </div>
                    ) : (
                      <p>{item}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer buttons */}
          <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Business Case : Je pratique
            </button>
            <button
              onClick={onClose}
              className="bg-[#023047] hover:bg-[#034a66] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichePedagogique;