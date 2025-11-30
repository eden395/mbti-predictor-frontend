const API_URL = 'https://mbti-predictor-backend.onrender.com'; 

// predictMBTI function:
const predictMBTI = async () => {
  setLoading(true);
  
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      setResult({
        type: data.predicted_type,
        probabilities: Object.entries(data.probabilities)
      });
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('Failed to connect to server: ' + error.message);
  }
  
  setLoading(false);
};