import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  
  // Base URL for easier updates
  const API_URL = "http://127.0.0.1:5000/api";

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories", err));
  }, []);

  const loadQuestions = (id) => {
    setSelectedCategory(id);
    axios.get(`${API_URL}/questions/${id}`)
      .then(res => setQuestions(res.data));
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    await axios.post(`${API_URL}/questions`, {
      user_id: user.id,
      category_id: selectedCategory,
      question: newQuestion
    });
    setNewQuestion("");
    loadQuestions(selectedCategory);
  };

  const loadAnswers = async (qid) => {
    const res = await axios.get(`${API_URL}/answers/${qid}`);
    setAnswers({ ...answers, [qid]: res.data });
  };

  const handleAddAnswer = async (qid) => {
    const text = newAnswer[qid];
    if (!text) {
      alert("Please type an answer");
      return;
    }
    await axios.post(`${API_URL}/answers`, {
      question_id: qid,
      user_id: user.id,
      answer: text
    });
    setNewAnswer({ ...newAnswer, [qid]: "" }); // Clear input
    loadAnswers(qid);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        
        {/* LEFT SIDEBAR: CATEGORIES */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white fw-bold">
              Topics
            </div>
            <div className="list-group list-group-flush">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  className={`list-group-item list-group-item-action border-0 ${selectedCategory === cat.id ? 'active bg-primary' : ''}`}
                  onClick={() => loadQuestions(cat.id)}
                >
                  <i className="bi bi-tag-fill me-2"></i> {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: QUESTIONS & ANSWERS */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-secondary">Dashboard</h2>
            <span className="badge bg-light text-dark border p-2">
              Logged in as: <strong>{user?.username}</strong>
            </span>
          </div>

          {selectedCategory ? (
            <>
              {/* ASK QUESTION BOX */}
              <div className="card shadow-sm mb-4 border-0 bg-light">
                <div className="card-body">
                  <div className="input-group">
                    <input
                      className="form-control form-control-lg"
                      placeholder="What is your question?"
                      value={newQuestion}
                      onChange={e => setNewQuestion(e.target.value)}
                    />
                    <button className="btn btn-primary px-4" onClick={handleAddQuestion}>
                      Post Question
                    </button>
                  </div>
                </div>
              </div>

              {/* QUESTIONS LIST */}
              {questions.length > 0 ? (
                questions.map(q => (
                  <div key={q.id} className="card shadow-sm mb-3 border-0">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{q.question}</h5>
                      <hr className="text-muted opacity-25" />
                      
                      {/* ANSWERS SECTION */}
                      <div className="mb-3">
                        {(answers[q.id] || []).map(a => (
                          <div key={a.id} className="p-2 mb-2 bg-light rounded border-start border-primary border-4">
                            <small className="text-muted d-block">Answered:</small>
                            {a.answer}
                          </div>
                        ))}
                      </div>

                      {/* ADD ANSWER INPUT */}
                      <div className="input-group input-group-sm mt-3">
                        <input
                          className="form-control"
                          placeholder="Write a helpful response..."
                          value={newAnswer[q.id] || ""}
                          onChange={e =>
                            setNewAnswer({ ...newAnswer, [q.id]: e.target.value })
                          }
                        />
                        <button className="btn btn-outline-success" onClick={() => handleAddAnswer(q.id)}>
                          Reply
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => loadAnswers(q.id)}>
                          Refresh Answers
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5 text-muted">
                  <p>No questions yet for this topic. Be the first to ask!</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-5 p-5 bg-light rounded shadow-sm border">
              <h4 className="text-muted">Welcome to your Knowledge Base</h4>
              <p>Select a category on the left to start viewing or asking questions.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;