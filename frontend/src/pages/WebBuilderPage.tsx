import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, LogOut, Settings } from 'lucide-react';
import { apiService } from '../services/api';

export function WebBuilderPage() {
  const navigate = useNavigate();
  const authData = apiService.getAuthData();

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleLogout = () => {
    apiService.clearAuthData();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                {authData.companyName || 'SaaS Core'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2" />
                {authData.userEmail}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Settings className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to your Web Builder!
            </h2>
            <p className="text-gray-600 mb-8">
              You've successfully registered your company and are now ready to build your web presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Company Info</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Name:</strong> {authData.companyName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tenant ID:</strong> {authData.tenantId?.slice(0, 8)}...
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">User Info</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> {authData.userEmail}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Role:</strong> {authData.userRole}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
                <p className="text-sm text-gray-600">
                  Start building your web application with the tools and features available in your dashboard.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
