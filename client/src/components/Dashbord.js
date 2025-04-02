import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [materiels, setMateriels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:5000/api/materiels')
      .then(response => setMateriels(response.data))
      .catch(error => console.error('Erreur de chargement des matériels:', error));
  }, []);

  const filteredMateriels = materiels.filter(material =>
    material.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.numero_serie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMateriels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMateriels = filteredMateriels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-[#E31837]">
          <h1 className="text-2xl font-bold text-white">Gestion des Matériels</h1>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E31837] focus:border-[#E31837]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Numéro Série</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date d'Ajout</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedMateriels.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{material.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{material.numero_serie}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(material.date_ajout).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard ;
