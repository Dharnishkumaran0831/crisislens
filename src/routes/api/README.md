# API Endpoints Documentation

This directory contains TanStack React Start API server handler routes.

---

## 📡 Endpoints

### 1. `/api/ai`
- **Method**: `POST`
- **Description**: Handles AI roadmap generation, career guidance prompts, and skill analysis via backend provider integrations.
- **Request Body**:
  ```json
  {
    "prompt": "Recommend a 6-month roadmap for Full-Stack Web Development",
    "context": { "skills": ["React", "TypeScript"] }
  }
  ```

---

### 2. `/api/chat`
- **Method**: `POST`
- **Description**: Interactive conversational assistant route for real-time portfolio Q&A and user guidance.
- **Request Body**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "Tell me about Dharnishkumaran's Medichain project" }
    ]
  }
  ```
