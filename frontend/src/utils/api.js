const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Perform an HTTP Request
 * @param {string} endpoint - API path (e.g. '/auth/login')
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {Object} body - Request body
 * @param {boolean} isMultipart - True if uploading files via FormData
 * @returns {Promise<Object>} JSON response
 */
export const request = async (endpoint, method = 'GET', body = null, isMultipart = false) => {
  const token = localStorage.getItem('token');
  
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = isMultipart ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // For file download streams, return the response directly
    if (endpoint.includes('/download-secure')) {
      return response;
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
};
