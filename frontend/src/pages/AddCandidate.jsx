import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCandidate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: {
      htmlCss: false,
      javascript: false,
      react: false,
      nextjs: false,
      crudApp: false,
      database: false,
      authentication: false,
      deployment: false,
      expressHono: false,
      apiDocumentation: false,
      golang: false,
      laravel: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Skill mapping for backend
  const skillMap = {
    htmlCss: ['html', 'css'],
    javascript: ['javascript'],
    react: ['react'],
    nextjs: ['nextjs'],
    crudApp: ['crud'],
    database: ['database'],
    authentication: ['auth'],
    deployment: ['deployment'],
    expressHono: ['express', 'hono'],
    apiDocumentation: ['apiDocs'],
    golang: ['golang'],
    laravel: ['laravel'],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skill]: !prev.skills[skill] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simple validation
      if (!formData.name || !formData.email || !formData.phone) {
        setMessage('Name, email, and phone are required.');
        setLoading(false);
        return;
      }

      // Collect selected skills
      const selectedSkills = Object.entries(formData.skills)
        .filter(([_, value]) => value)
        .flatMap(([key]) => skillMap[key] || []);

      if (selectedSkills.length === 0) {
        setMessage('Please select at least one skill.');
        setLoading(false);
        return;
      }

      // Prepare data
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: selectedSkills,
      };

      // API call
      const response = await fetch('https://candidate-categorization-platform-2.onrender.com/api/candidates/register-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to register candidate');

      setMessage(`Candidate registered successfully! Tier assigned: ${data.tier}`);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: Object.fromEntries(Object.keys(formData.skills).map((k) => [k, false])),
      });

      // Redirect after 2 seconds
      setTimeout(() => navigate('/candidates'), 2000);
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const skillQuestions = [
    { id: 'htmlCss', label: 'HTML & CSS', description: 'Basic web development' },
    { id: 'javascript', label: 'JavaScript', description: 'Core programming language' },
    { id: 'react', label: 'React', description: 'Frontend library' },
    { id: 'nextjs', label: 'Next.js', description: 'React framework' },
    { id: 'crudApp', label: 'CRUD App', description: 'Can build a CRUD application' },
    { id: 'database', label: 'Database', description: 'MongoDB, MySQL, PostgreSQL' },
    { id: 'authentication', label: 'Authentication', description: 'Password & OAuth' },
    { id: 'deployment', label: 'Deployment', description: 'Vercel, Netlify, AWS' },
    { id: 'expressHono', label: 'Express/Hono', description: 'Node.js backend framework' },
    { id: 'apiDocumentation', label: 'API Docs', description: 'Swagger/OpenAPI' },
    { id: 'golang', label: 'Golang', description: 'Go programming language' },
    { id: 'laravel', label: 'Laravel', description: 'PHP backend framework' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Add New Candidate</h1>
          <p className="text-gray-600 mt-1">Fill out candidate details and skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-lg border ${
                message.includes('successfully')
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1-555-0123"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Skill Assessment</h2>
            <p className="text-gray-600 mb-4">Select the candidate's skills:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillQuestions.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.skills[q.id] ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleSkillChange(q.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.skills[q.id]}
                      onChange={() => handleSkillChange(q.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{q.label}</label>
                      <p className="text-sm text-gray-500 mt-1">{q.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/candidates')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
