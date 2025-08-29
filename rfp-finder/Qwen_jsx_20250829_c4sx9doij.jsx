// App.jsx
function App() {
  const [keywords, setKeywords] = useState('cloud computing');
  const [mode, setMode] = useState('search'); // 'search' or 'import'

  // Simulated RFP results (in real app, this comes from SAM.gov API)
  const results = [
    {
      id: 'RFP-2024-CS-001',
      title: 'Cloud Security Services for Federal Agencies',
      agency: 'Department of Defense',
      description: 'The agency seeks experienced vendors to provide secure, scalable cloud infrastructure with 24/7 monitoring and compliance with NIST 800-53 standards.',
    },
    {
      id: 'RFP-2024-IT-002',
      title: 'IT Support Services for Veterans Affairs',
      agency: 'Department of Veterans Affairs',
      description: 'Comprehensive desktop, network, and helpdesk support for 10,000+ users across 50 locations.',
    },
  ];

  const addDarkClass = () => {
    document.documentElement.classList.toggle('dark');
  };

  const exportToPDF = (rfp) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`RFP: ${rfp.title}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`ID: ${rfp.id}`, 10, 30);
    doc.text(`Agency: ${rfp.agency}`, 10, 40);
    doc.text('AI Summary:', 10, 50);
    doc.text(rfp.description, 10, 60, { maxWidth: 180 });
    doc.save(`${rfp.id}.pdf`);
  };

  if (mode === 'import') {
    return (
      <div className="p-8 max-w-2xl mx-auto bg-white dark:bg-gray-900 dark:text-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4">📥 Manual Data Import</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload your own RFP documents or proposal templates here.
        </p>
        <button
          onClick={() => setMode('search')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to RFP Search
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-200">
      <div className="p-6 max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🔍 RFP Insight</h1>
          <button
            onClick={addDarkClass}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
          >
            💡 Dark Mode
          </button>
        </header>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Search government RFPs and get AI-powered summaries in plain English.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keyword: cybersecurity, IT, construction..."
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setMode('search')}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            🔍 Search RFPs
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {results.map((rfp) => (
            <div
              key={rfp.id}
              id={`rfp-${rfp.id}`}
              className="border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800"
            >
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-400">{rfp.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                <strong>ID:</strong> {rfp.id} | <strong>Agency:</strong> {rfp.agency}
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <strong>AI Summary:</strong>
                <p className="mt-1">{rfp.description}</p>
              </div>
              <div className="mt-4 space-x-3">
                <button
                  onClick={() => exportToPDF(rfp)}
                  className="text-sm underline text-blue-600"
                >
                  📄 Export to PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded">
          <h3 className="font-bold">🔔 Get Email Alerts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We'll email you when new RFPs match "{keywords}"
          </p>
          <div className="flex mt-2">
            <input
              placeholder="your@email.com"
              className="flex-1 p-2 border rounded-l text-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add useState (simple React state)
const useState = (initial) => {
  let val = initial;
  const setState = (newVal) => {
    val = typeof newVal === 'function' ? newVal(val) : newVal;
    rerender();
  };
  return [val, setState];
};

let root;
const rerender = () => {
  ReactDOM.render(<App />, root);
};

// Initialize
root = document.getElementById('root');
rerender();